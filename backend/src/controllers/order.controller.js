const { default: mongoose } = require('mongoose');
const {
    ORDER_STATUS,
    ORDER_PAYMENT_STATUS,
    ORDER_PAYMENT_TYPE,
} = require('../constants');
const { MenuItem } = require('../models/menu.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');
const { Table } = require('../models/table.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { startOfDay, endOfDay } = require('date-fns');

const createOrder = asyncHandler(async (req, res, next) => {
    const { restaurantUsername } = req.params;
    const { tableNumber } = req.params;
    if (!restaurantUsername || !tableNumber) {
        throw new ApiError(
            400,
            'Restaurant Username and Table Number are required'
        );
    }

    // find restaurantId from restaurantUsername
    const restaurant = await Restaurant.findOne({
        username: restaurantUsername,
    });
    if (!restaurant) {
        throw new ApiError(400, 'Restaurant not found');
    }
    const restaurantId = restaurant._id;

    const { orderItems, phoneNumber, orderNote } = req.body;

    const table = await Table.findOne({
        restaurantId,
        tableNumber: tableNumber,
    });

    if (!table) {
        throw new ApiError(400, 'Table not found');
    }

    // Initialize an array to store the details of each order item
    const orderItemsDetails = [];

    // Calculate totalAmount by summing up the total amounts of individual items
    let totalAmount = 0;

    // Iterate through each order item
    for (const orderItem of orderItems) {
        const { itemId, quantity } = orderItem;

        // Retrieve the item details from the database based on itemId
        const item = await MenuItem.findOne({
            restaurantId,
            _id: itemId,
        });

        if (!item) {
            throw new ApiError(400, `Item with Id ${itemId} not found`);
        }

        // Calculate the total amount for the current order item
        const discountPercentage = item.discountPercentage || 0;
        const discountedPrice =
            item.price - (item.price * discountPercentage) / 100;
        const itemTotalAmount = quantity * discountedPrice;

        // Add the order item details to the array
        orderItemsDetails.push({
            itemId: item._id,
            quantity,
            price: discountedPrice,
            totalAmount: itemTotalAmount,
        });

        // Add the itemTotalAmount to the overall totalAmount
        totalAmount += itemTotalAmount;
    }

    // Create the order with the calculated orderItemsDetails and totalAmount
    const order = await Order.create({
        restaurantId,
        tableId: table._id,
        phoneNumber: phoneNumber,
        orderItems: orderItemsDetails,
        totalAmount,
        orderNote,
        status: ORDER_STATUS.PENDING,
        paymentStatus: ORDER_PAYMENT_STATUS.UNPAID,
    });

    if (!order) {
        throw new ApiError(400, 'Order not created');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, order, 'Order created successfully'));
});

const getOrders = asyncHandler(async (req, res, next) => {
    const restaurantId = req.user.restaurantId;
    const { status } = req.body;

    let findQuery = {
        restaurantId:new mongoose.Types.ObjectId(restaurantId),
    };

    if (status) {
        if (!Object.values(ORDER_STATUS).includes(status)) {
            throw new ApiError(400, `Invalid status ${status}`);
        }
        findQuery.status = status;
    }

    const orders = await Order.aggregate([
        {
            $match: findQuery,
        },
        {
            $lookup: {
                from: 'tables',
                localField: 'tableId',
                foreignField: '_id',
                as: 'table',
            },
        },
        {
            $unwind: '$table',
        },
        {
            $lookup: {
                from: 'menuitems', // Update this to the actual name of the menu items collection
                localField: 'orderItems.itemId',
                foreignField: '_id',
                as: 'orderItemsDetails',
            },
        },
        {
            $project: {
                _id: 1,
                restaurantId: 1,
                tableId: 1,
                phoneNumber: 1,
                orderItems: {
                    $map: {
                        input: '$orderItems',
                        as: 'orderItem',
                        in: {
                            itemId: '$$orderItem.itemId',
                            quantity: '$$orderItem.quantity',
                            price: '$$orderItem.price',
                            totalAmount: '$$orderItem.totalAmount',
                            itemName: {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: '$orderItemsDetails',
                                            as: 'itemDetail',
                                            cond: {
                                                $eq: [
                                                    '$$itemDetail._id',
                                                    '$$orderItem.itemId',
                                                ],
                                            },
                                        },
                                    },
                                    0,
                                ],
                            },
                        },
                    },
                },
                totalAmount: 1,
                orderNote: 1,
                status: 1,
                paymentStatus: 1,
                createdAt: 1,
                updatedAt: 1,
                tableNumber: '$table.tableNumber',
            },
        },
        {
            $project: {
                _id: 1,
                restaurantId: 1,
                tableId: 1,
                phoneNumber: 1,
                orderItems: {
                    $map: {
                        input: '$orderItems',
                        as: 'orderItem',
                        in: {
                            itemId: '$$orderItem.itemId',
                            quantity: '$$orderItem.quantity',
                            price: '$$orderItem.price',
                            totalAmount: '$$orderItem.totalAmount',
                            itemName: '$$orderItem.itemName.name', // Extract the name property
                        },
                    },
                },
                totalAmount: 1,
                orderNote: 1,
                status: 1,
                paymentStatus: 1,
                tableNumber: 1,
                createdAt: 1,
                updatedAt: 1,
            },
        },
    ]);

    if (orders.length === 0) {
        throw new ApiError(400, 'Orders not found');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, orders, 'Orders found successfully'));
});

const updateOrderStatus = asyncHandler(async (req, res, next) => {
        const restaurantId = req.user.restaurantId;

        const { orderId, status ,paymentStatus } = req.body;
        console.log(req.body);
        if (status) {
            if (!Object.values(ORDER_STATUS).includes(status)) {
                throw new ApiError(400, `Invalid status ${status}`);
            }
        }
        if(paymentStatus){
            if (!Object.values(ORDER_PAYMENT_STATUS).includes(paymentStatus)) {
                throw new ApiError(400, `Invalid payment status ${paymentStatus}`);
            }
        }
        const order = await Order.findOneAndUpdate(
            { restaurantId, _id: orderId },
            { status ,paymentStatus},
            { new: true }
        );
        console.log(order);
        if (!order) {
            throw new ApiError(400, 'Order not updated');
        }

        return res
            .status(200)
            .json(new ApiResponse(200, order, 'Order updated successfully'));
    })


const updateOrderPaymentStatus = asyncHandler(
    asyncHandler(async (req, res, next) => {
        const restaurantId = req.user.restaurantId;

        const { orderId, paymentStatus, paymentType } = req.body;

        if (!paymentStatus || !paymentType) {
            throw new ApiError(
                400,
                'Payment Status and Payment Type are required'
            );
        }
        if (paymentStatus !== 'paid') {
            throw new ApiError(400, `Invalid payment status ${paymentStatus}`);
        }
        if (!Object.values(ORDER_PAYMENT_STATUS).includes(paymentStatus)) {
            throw new ApiError(400, `Invalid payment status ${paymentStatus}`);
        }
        if (!Object.values(ORDER_PAYMENT_TYPE).includes(paymentType)) {
            throw new ApiError(400, `Invalid payment type ${paymentType}`);
        }

        const order = await Order.findOneAndUpdate(
            { restaurantId, _id: orderId, status: 'served' },
            { paymentStatus, paymentType },
            { new: true }
        ); // Check if the current status is "served"

        if (!order) {
            throw new ApiError(400, 'Order not updated');
        }

        return res
            .status(200)
            .json(new ApiResponse(200, order, 'Order updated successfully'));
    })
);

const trackOrder = asyncHandler(async (req, res, next) => {
    const { restaurantUsername,phoneNumber } = req.params;
    if (!phoneNumber) {
        throw new ApiError(400, "Please Provide Phone Number");
    }
    const restaurantId = await Restaurant.findOne({
        username: restaurantUsername,
    }).select("_id");

    if(!restaurantId){
        throw new ApiError(400,"Restaurant Not Found")
    }
   
    // Update the query to include the phone number and filter by today's date
    // const trackOrder = await Order.find({
    //     phoneNumber: phoneNumber,
    //     createdAt: { $gte: new Date(currentDate) }
    // })
    const trackOrder = await Order.aggregate([
        {
            $match:{
                restaurantId: new mongoose.Types.ObjectId(restaurantId),
                phoneNumber:phoneNumber
            }
        },
        {
            $sort:{
                createdAt:-1
            }
        },
        {
            $lookup:{
                from:"tables",
                localField:"tableId",
                foreignField:"_id",
                as:"table",
                pipeline:[
                    {
                        $project:{
                            _id:0,
                            tableNumber:1
                        }
                    }
                ]
            },
        },
        {
            $addFields:{
                table:{
                    $first:"$table"
                }
            }
        },
        {
            $unwind:"$table"
        },
        {
            $project:{
                _id:1,
                phoneNumber:1,
                orderItems:1,
                totalAmount:1,
                orderNote:1,
                status:1,
                paymentStatus:1,
                createdAt:1,
                updatedAt:1,
                tableNumber:"$table.tableNumber"
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, trackOrder, "Order Found Successfully"));
});


const getDayTotalOrderAmount = asyncHandler(async (req, res, next) => {
    // get total order today for a restaurant

    const restaurantId = req.user.restaurantId;
    const currentDate = new Date();

    const orderAmount = await Order.aggregate([
        {
            $match: {
                restaurantId: new mongoose.Types.ObjectId(restaurantId),
                createdAt: {
                    $gte: startOfDay(currentDate),
                    $lt: endOfDay(currentDate),
                },
            },
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$totalAmount' },
                paidAmount: {
                    $sum: {
                        $cond: {
                            if: { $eq: ['$paymentStatus', 'paid'] },
                            then: '$totalAmount',
                            else: 0,
                        },
                    },
                },
                unpaidAmount: {
                    $sum: {
                        $cond: {
                            if: { $eq: ['$paymentStatus', 'unpaid'] },
                            then: '$totalAmount',
                            else: 0,
                        },
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                totalAmount: 1,
                paidAmount: 1,
                unpaidAmount: 1,
            },
        },
    ]);

    if (orderAmount.length === 0) {
        throw new ApiError(400, 'Order amount not found');
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, orderAmount, 'Order amount found successfully')
        );
});

const getOrderStats = asyncHandler(async (req, res, next) => {
    const restaurantId = req.user.restaurantId;

    const orderStats = await Order.aggregate([
        {
            $match: {
                restaurantId:new mongoose.Types.ObjectId(restaurantId),
            },
        },
        {
            $group: {
                _id: null,
                totalOrders: { $sum: 1 }, // Count the total number of orders
                totalAmount: { $sum: '$totalAmount' }, // Calculate the total order amount
                uniqueUsers: { $addToSet: '$phoneNumber' }, // Collect unique phone numbers
            },
        },
        {
            $project: {
                _id: 0,
                totalOrders: 1,
                totalAmount: 1,
                totalUsers: { $size: '$uniqueUsers' }, // Count the number of unique users
            },
        },
    ]);

    // The result will be an array with one document containing total orders and total users
    //const stats = orderStats.length > 0 ? orderStats[0] : { totalOrders: 0, totalUsers: 0 };

    if (orderStats.length === 0) {
        throw new ApiError(400, 'Order stats not found');
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, orderStats, 'Order stats found successfully')
        );
});

const getTotalOrderAmountPerItem = asyncHandler(async(req,res)=> {
    const restaurantId = req.user.restaurantId;
    const totalSalesOrderByItem = await Order.aggregate([
        {
            $match: {
                restaurantId: new mongoose.Types.ObjectId(restaurantId),
            },
        },
        {
            $unwind: '$orderItems',
        },
        {
            $lookup: {
                from: 'menuitems',
                localField: 'orderItems.itemId',
                foreignField: '_id',
                as: 'menuItem',
            },
        },
        {
            $unwind: '$menuItem',
        },
        {
            $group: {
                _id: '$menuItem._id',
                itemName: { $first: '$menuItem.name' },
                totalAmount: { $sum: '$orderItems.totalAmount' },
            },
        },
        {
            $project: {
                _id: 0,
                itemId: '$_id',
                itemName: 1,
                totalAmount: 1,
            },
        },
    ]);
    if (totalSalesOrderByItem.length === 0) {
        throw new ApiError(400, 'Total sales by item not found');
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                totalSalesOrderByItem,
                'Total sales by item found successfully'
            )
        );
})

const order = {
    createOrder,
    getOrders,
    updateOrderStatus,
    updateOrderPaymentStatus,
    getDayTotalOrderAmount,
    getOrderStats,
    getTotalOrderAmountPerItem,
    trackOrder
};
module.exports = order;
