const mongoose = require('mongoose');
const {Table} = require("../models/table.model");
const { startOfDay, endOfDay, parseISO } = require("date-fns");


async function getAllTableData(restaurantId) {
    const currentDate = new Date();
    
    // Set the currentDate to the beginning of the day (12:00 AM)
    const currentDateStart = startOfDay(currentDate);

    // Set the currentDate to the end of the day (11:59 PM)
    const currentDateEnd = endOfDay(currentDate);

    const pipeline = [
        {
            $match: {
                restaurantId: new mongoose.Types.ObjectId(restaurantId),
            },
        },
        {
            $lookup: {
                from: 'orders',
                let: { tableId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$tableId', '$$tableId'] },
                                    { $gte: ['$createdAt', currentDateStart] },
                                    { $lte: ['$createdAt', currentDateEnd] },
                                ],
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: 'payments',
                            localField: '_id',
                            foreignField: 'orderId',
                            as: 'payments',
                        },
                    },
                    {
                        $addFields: {
                            paymentStatus: {
                                $cond: {
                                    if: { $gte: [{ $size: '$payments' }, 1] },
                                    then: 'paid',
                                    else: 'unpaid',
                                },
                            },
                        },
                    },
                ],
                as: 'orders',
            },
        },
        {
            $project: {
                tableNumber: 1,
                //totalOrder: { $size: '$orders' },
                orderCount:{$size:'$orders'},
                totalAmount: { $sum: '$orders.totalAmount' },
                paidAmount: {
                    $reduce: {
                        input: '$orders',
                        initialValue: 0,
                        in: {
                            $add: [
                                '$$value',
                                {
                                    $cond: {
                                        if: { $eq: ['$$this.paymentStatus', 'paid'] },
                                        then: '$$this.totalAmount',
                                        else: 0,
                                    },
                                },
                            ],
                        },
                    },
                },
                unpaidAmount: {
                    $reduce: {
                        input: '$orders',
                        initialValue: 0,
                        in: {
                            $add: [
                                '$$value',
                                {
                                    $cond: {
                                        if: { $eq: ['$$this.paymentStatus', 'unpaid'] },
                                        then: '$$this.totalAmount',
                                        else: 0,
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
    ];

    const result = await Table.aggregate(pipeline);

    return result;
}











module.exports = {getAllTableData}