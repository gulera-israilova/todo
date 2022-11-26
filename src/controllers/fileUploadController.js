class fileUploadController {
    async fileUpload(req, res) {
        res.json({
            url: `/uploads/${req.file.originalname}`,
        });
    };
}

export default new fileUploadController();