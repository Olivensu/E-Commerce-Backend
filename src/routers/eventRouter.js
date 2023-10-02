const express = require('express');
const {mongoose} = require('mongoose');
const createHttpError = require('http-errors');
const upload = require('../middlewares/uploadFile');
const Slider = require('../models/sliderModel');
const { successResponse } = require('../controllers/responceController');
const { deleteImage } = require('../helper/deleteImage');
const { findWithId } = require('../services/findUser');
const Campaign = require('../models/campaignModel');
const FlashSale = require('../models/flashsaleModel');
const eventRouter = express.Router();

eventRouter.post('/slider', upload.single("image"), async(req, res,next) => {

    try {
        const imagefile = req.file;

        if(!imagefile){
            throw createHttpError(404, 'Image not found')
        }
        if(imagefile.size>1024*1024*2){
            throw createHttpError(400, 'Image size is too large')
        }
        const image = req.file.filename;
        const slider = await Slider.create({image: image})
        slider.save();

        return successResponse(res, {
            statusCode: 200,
            message: `Image saved successfully`,
            payload: slider
        })
    } catch (error) {
        if(error instanceof mongoose.Error){
            next(createHttpError(400, 'Invalid User Id'))
            return;
        }
        next(error)
    }
})

eventRouter.get('/slider', async(req, res,next) => {

    try {
        const slider = await Slider.find()
        if(!slider) throw createHttpError(404, 'no users found');

        return successResponse(res, {
            statusCode: 200,
            message: `Image saved successfully`,
            payload: slider
        })
    } catch (error) {
        if(error instanceof mongoose.Error){
            next(createHttpError(400, 'Invalid User Id'))
            return;
        }
        next(error)
    }
})

eventRouter.delete('/slider/:id', async(req, res,next) => {

    try {
        const id = req.params.id;
        const slider = await Slider.findById(id)

        if(!slider){
            throw createError(404, 'slider not found');
        }

        const sliderImagePath = slider.image;
        deleteImage(sliderImagePath)

        await Slider.findByIdAndDelete(id);

        return successResponse(res, {
            statusCode: 200,
            message: `Image Deleted successfully`
        })
    } catch (error) {
        console.error(error)
        if(error instanceof mongoose.Error){
            next(createHttpError(400, 'Invalid User Id'))
            return;
        }
        next(error)
    }
})

eventRouter.post('/campaign', upload.single("image"), async(req, res,next) => {

    try {
        const {date} = req.body;
        const imagefile = req.file;

        if(!imagefile){
            throw createHttpError(404, 'Image not found')
        }
        if(imagefile.size>1024*1024*2){
            throw createHttpError(400, 'Image size is too large')
        }
        const image = req.file.filename;
        const campaign = await Campaign.create({date:date,image: image})
        campaign.save();

        return successResponse(res, {
            statusCode: 200,
            message: `Campaign saved successfully`,
            payload: campaign
        })
    } catch (error) {
        if(error instanceof mongoose.Error){
            next(createHttpError(400, 'Invalid User Id'))
            return;
        }
        next(error)
    }
})

eventRouter.get('/campaign', async(req, res,next) => {

    try {
        const campaign = await Campaign.find()
        if(!campaign) throw createHttpError(404, 'no users found');

        return successResponse(res, {
            statusCode: 200,
            message: `campaign get successfully`,
            payload: campaign
        })
    } catch (error) {
        if(error instanceof mongoose.Error){
            next(createHttpError(400, 'Invalid User Id'))
            return;
        }
        next(error)
    }
})

eventRouter.delete('/campaign/:id', async(req, res,next) => {

    try {
        const id = req.params.id;
        const campaign = await Campaign.findById(id)

        if(!campaign){
            throw createError(404, 'slider not found');
        }

        const sliderImagePath = campaign.image;
        deleteImage(sliderImagePath)

        await Campaign.findByIdAndDelete(id);

        return successResponse(res, {
            statusCode: 200,
            message: `Image Deleted successfully`
        })
    } catch (error) {
        console.error(error)
        if(error instanceof mongoose.Error){
            next(createHttpError(400, 'Invalid User Id'))
            return;
        }
        next(error)
    }
})


eventRouter.post('/flash-sale', upload.single("image"), async(req, res,next) => {

    try {
        const imagefile = req.file;

        if(!imagefile){
            throw createHttpError(404, 'Image not found')
        }
        if(imagefile.size>1024*1024*5){
            throw createHttpError(400, 'Image size is too large')
        }
        const image = req.file.filename;
        const slider = await FlashSale.create({image: image})
        slider.save();

        return successResponse(res, {
            statusCode: 200,
            message: `Image saved successfully`,
            payload: slider
        })
    } catch (error) {
        if(error instanceof mongoose.Error){
            next(createHttpError(400, 'Invalid User Id'))
            return;
        }
        next(error)
    }
})

eventRouter.get('/flash-sale', async(req, res,next) => {

    try {
        const slider = await FlashSale.find()
        if(!slider) throw createHttpError(404, 'no users found');

        return successResponse(res, {
            statusCode: 200,
            message: `Image saved successfully`,
            payload: slider
        })
    } catch (error) {
        if(error instanceof mongoose.Error){
            next(createHttpError(400, 'Invalid User Id'))
            return;
        }
        next(error)
    }
})

eventRouter.delete('/flash-sale/:id', async(req, res,next) => {

    try {
        const id = req.params.id;
        const slider = await FlashSale.findById(id)

        if(!slider){
            throw createError(404, 'slider not found');
        }

        const sliderImagePath = slider.image;
        deleteImage(sliderImagePath)

        await FlashSale.findByIdAndDelete(id);

        return successResponse(res, {
            statusCode: 200,
            message: `Image Deleted successfully`,
            payload: slider
        })
    } catch (error) {
        console.error(error)
        if(error instanceof mongoose.Error){
            next(createHttpError(400, 'Invalid User Id'))
            return;
        }
        next(error)
    }
})

module.exports = eventRouter;

