const Application = require('../models/Application');

const getApplications = async (req, res) => {
    const user_id = req.user._id;

    try {
        const applications = await Application
            .find({ user_id })
            .sort({ createdAt: -1 });

        res.status(200).json(applications);

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};


const addApplication = async (req, res) => {

    const {
        company,
        role,
        status,
        jobLink,
        notes,
        dateApplied
    } = req.body;

    // Company validation
    if (!company || !company.trim()) {
        return res.status(400).json({
            error: 'Company is required'
        });
    }

    // Role validation
    if (!role || !role.trim()) {
        return res.status(400).json({
            error: 'Role is required'
        });
    }

    // Status validation
    if (
        status &&
        !['Applied', 'Interview', 'Offer', 'Rejected'].includes(status)
    ) {
        return res.status(400).json({
            error: 'Invalid application status'
        });
    }

    // Date validation
    if (dateApplied && isNaN(Date.parse(dateApplied))) {
        return res.status(400).json({
            error: 'Invalid application date'
        });
    }

    // Job link validation
    if (jobLink) {
        try {
            const url = new URL(jobLink);

            if (!['http:', 'https:'].includes(url.protocol)) {
                return res.status(400).json({
                    error: 'Invalid job link'
                });
            }

        } catch (err) {
            return res.status(400).json({
                error: 'Invalid job link'
            });
        }
    }

    const user_id = req.user._id;

    try {
        const application = await Application.create({
            company,
            role,
            status,
            jobLink,
            notes,
            dateApplied,
            user_id
        });

        res.status(201).json(application);

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};


const updateApplication = async (req, res) => {

    const { id } = req.params;

    const allowedFields = [
        'company',
        'role',
        'status',
        'jobLink',
        'notes',
        'dateApplied'
    ];

    const updates = {};

    
    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    }


    if ('company' in updates && !updates.company.trim()) {
        return res.status(400).json({
            error: 'Company cannot be empty'
        });
    }

    if ('role' in updates && !updates.role.trim()) {
        return res.status(400).json({
            error: 'Role cannot be empty'
        });
    }

    if (
        'status' in updates &&
        !['Applied', 'Interview', 'Offer', 'Rejected'].includes(updates.status)
    ) {
        return res.status(400).json({
            error: 'Invalid application status'
        });
    }
    
    if (
        'dateApplied' in updates &&
        isNaN(Date.parse(updates.dateApplied))
    ) {
        return res.status(400).json({
            error: 'Invalid application date'
        });
    }

    if ('jobLink' in updates && updates.jobLink) {
        try {
            const url = new URL(updates.jobLink);

            if (!['http:', 'https:'].includes(url.protocol)) {
                return res.status(400).json({
                    error: 'Invalid job link'
                });
            }

        } catch (err) {
            return res.status(400).json({
                error: 'Invalid job link'
            });
        }
    }

    
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({
            error: 'No valid fields provided for update'
        });
    }

    try {
        const application = await Application.findOneAndUpdate(
            {
                _id: id,
                user_id: req.user._id
            },
            updates,
            { new: true }
        );

        if (!application) {
            return res.status(404).json({
                error: 'Application not found'
            });
        }

        return res.status(200).json(application);

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};


const deleteApplication = async (req, res) => {

    const { id } = req.params;

    try {
        const application = await Application.findOneAndDelete({
            _id: id,
            user_id: req.user._id
        });

        if (!application) {
            return res.status(404).json({
                error: 'Application not found'
            });
        }

        res.status(200).json({
            message: 'Application deleted'
        });

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};


module.exports = {
    getApplications,
    addApplication,
    updateApplication,
    deleteApplication
};