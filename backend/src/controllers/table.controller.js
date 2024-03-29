const { Table } = require('../models/table.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { TABLE_STATUS } = require('../constants');
const { startOfDay, endOfDay } = require('date-fns');
const { default: mongoose } = require('mongoose');
const { getTable, getAllTableData } = require('../services/table.service');

const createTable = asyncHandler(async (req, res, next) => {
    const restaurantId = req.user.restaurantId;

    const { tableNumber, capacity } = req.body;
    if (!tableNumber || !capacity) {
        throw new ApiError(400, 'Table Number and Capacity are required');
    }

    const table = await Table.create({
        restaurantId,
        tableNumber,
        capacity,
        status: TABLE_STATUS.AVAILABLE,
    });

    if (!table) {
        throw new ApiError(400, 'Table not created');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, table, 'Table created successfully'));
});

const updateTable = asyncHandler(async (req, res, next) => {
    const restaurantId = req.user.restaurantId;

    const { tableId, tableNumber, capacity, status } = req.body;
    if (status) {
        if (!Object.values(TABLE_STATUS).includes(status)) {
            throw new ApiError(400, `Invalid status ${status}`);
        }
    }

    const table = await Table.findOneAndUpdate(
        { restaurantId, _id: tableId },
        { tableNumber, capacity, status },
        { new: true }
    );

    if (!table) {
        throw new ApiError(400, 'Table not updated');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, table, 'Table updated successfully'));
});

const deleteTable = asyncHandler(async (req, res, next) => {
    const restaurantId = req.user.restaurantId;

    const { tableId } = req.params;

    const table = await Table.findOneAndDelete({ restaurantId, _id: tableId });

    if (!table) {
        throw new ApiError(400, 'Table not deleted');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, table, 'Table deleted successfully'));
});

const getTableHandler = asyncHandler(async (req, res, next) => {
    const restaurantId = req.user.restaurantId;
    
    const currentDate = new Date(); // Current date

    const table = await getAllTableData(restaurantId, currentDate);

    if (table.length === 0) {
        throw new ApiError(400, 'Table not found');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, table, 'Table found successfully'));
});

const table = {
    createTable,
    updateTable,
    deleteTable,
    getTableHandler,
};

module.exports = table;
