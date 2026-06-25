const userModal = require("../../models/user")
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

exports.register = async (request, response) => {

    try {
        var checkEmail = await userModal.findOne({
            email : request.body.email,
            role_type : 'User',
            deleted_at : null
        })

        if(checkEmail){
            var data = {
                _status : false,
                _message : 'Email id already exit !'
            }

            response.send(data)
        }

        if(!request.body.password){
            var data = {
                _status : false,
                _message : 'Password is required !'
            }

            response.send(data)
        }

        var saveData = request.body;
        saveData.password = await bcrypt.hash(request.body.password, saltRounds);
        saveData.role_type = 'User';

        userModal(saveData).save()
        .then((result) => {
            var token = jwt.sign({ userData: result }, process.env.secret_key);

            const data = {
                _status : true,
                _token : token,
                _message : 'Account created succussfully.',
                _data : result,
            }
            response.send(data);
        })
        .catch((error) => {

            var errorMessages = {};
            for(key in error.errors){
                errorMessages[key] = error.errors[key].message
            }

            const data = {
                _status : false,
                _message : 'Something went wrong.',
                _data : null,
                _error : errorMessages
            }
            response.send(data);
        })
    } catch (error) {
        var data = {
            _status : false,
            _message : 'Something went wrong !!'
        }

        response.send(data)
    }
}

exports.login = async (request, response) => {

    try {
        var checkEmail = await userModal.findOne({
            email : request.body.email,
            role_type : 'User',
            deleted_at : null
        })

        if(!checkEmail){
            var data = {
                _status : false,
                _message : "Email id does't exit !"
            }

            response.send(data)
        }

        if(!request.body.password){
            var data = {
                _status : false,
                _message : 'Password is required !'
            }

            response.send(data)
        }

        var verifyPassword = await bcrypt.compare(request.body.password, checkEmail.password);

        if(!verifyPassword){
            var data = {
                _status : false,
                _message : 'Password is incorrect !'
            }

            response.send(data)
        }

        if(!checkEmail.status){
            var data = {
                _status : false,
                _message : 'Account is deactivated. Please contact support !'
            }

            response.send(data)
        }


        var token = jwt.sign({ userData: checkEmail }, process.env.secret_key);

        var data = {
            _status : true,
            _token : token,
            _message : 'Login succussfully.',
            _data : checkEmail,
        }
        response.send(data);
    } catch (error) {
        var data = {
            _status : false,
            _message : 'Something went wrong !!'
        }

        response.send(data)
    }

}

exports.viewProfile = async (request, response) => {

    // console.log(request.headers.authorization.split(' '))
    try {
        var token = request.headers.authorization.split(' ');

        var verifyToken = await jwt.verify(token[1], process.env.secret_key);

        userModal.findOne({
            _id : verifyToken.userData._id
        })
        .then((result) => {
            var data = {
                _status : true,
                _message : 'Profile Fetched',
                _data : result
            }

            response.send(data)
        })
        .catch((error) => {
            var data = {
                _status : false,
                _message : 'Something went wrong !!',
                _data : null,
                _error : error
            }

            response.send(data)
        })
    } catch (error) {
        var data = {
            _status : false,
            _message : 'Something went wrong !!'
        }

        response.send(data)
    }

}

exports.updateProfile = async (request, response) => {

    try {
        // Extract and verify token
        var authHeader = request.headers.authorization;
        
        if (!authHeader) {
            return response.send({
                _status: false,
                _message: 'Authorization token is required',
                _data: null
            });
        }

        var token = authHeader.split(' ');
        
        if (!token[1]) {
            return response.send({
                _status: false,
                _message: 'Invalid token format',
                _data: null
            });
        }

        var verifyToken = await jwt.verify(token[1], process.env.secret_key);

        // Find user by ID
        var user = await userModal.findOne({
            _id: verifyToken.userData._id,
            role_type : 'User',
            deleted_at: null
        });

        if (!user) {
            return response.send({
                _status: false,
                _message: 'User not found',
                _data: null
            });
        }

        // Prepare update data - only allow certain fields to be updated
        var updateData = {};

        // Update name if provided
        if (request.body.name) {
            updateData.name = request.body.name;
        }

        // Update email if provided and check uniqueness
        if (request.body.email && request.body.email !== user.email) {
            var existingEmail = await userModal.findOne({
                email: request.body.email,
                _id: { $ne: verifyToken.userData._id },
                role_type: 'User',
                deleted_at: null
            });

            if (existingEmail) {
                return response.send({
                    _status: false,
                    _message: 'Email already in use by another user',
                    _data: null
                });
            }

            updateData.email = request.body.email;
        }

        // Update mobile number if provided
        if (request.body.mobile_number) {
            updateData.mobile_number = request.body.mobile_number;
        }

        // Update gender if provided
        if (request.body.gender) {
            updateData.gender = request.body.gender;
        }

        // Update address if provided
        if (request.body.address) {
            updateData.address = request.body.address;
        }

        // Handle image upload if provided
        if (request.file) {
            updateData.image = request.file.filename;
        }

        // Set updated_at timestamp
        updateData.updated_at = new Date();

        // Update user profile
        var updatedUser = await userModal.findByIdAndUpdate(
            verifyToken.userData._id,
            updateData,
            { new: true, runValidators: true }
        );

        return response.send({
            _status: true,
            _message: 'Profile updated successfully',
            _data: updatedUser
        });

    } catch (error) {
        console.error('Update Profile Error:', error);

        if (error.name === 'JsonWebTokenError') {
            return response.send({
                _status: false,
                _message: 'Invalid token',
                _data: null
            });
        }

        if (error.name === 'TokenExpiredError') {
            return response.send({
                _status: false,
                _message: 'Token expired',
                _data: null
            });
        }

        if (error.name === 'ValidationError') {
            var errorMessages = {};
            for (let key in error.errors) {
                errorMessages[key] = error.errors[key].message;
            }

            return response.send({
                _status: false,
                _message: 'Validation error',
                _data: null,
                _error: errorMessages
            });
        }

        var data = {
            _status: false,
            _message: 'Something went wrong!!',
            _data: null,
            _error: error.message
        };

        response.send(data);
    }
}

exports.changePassword = async (request, response) => {
    try {
        // Extract and verify token
        var authHeader = request.headers.authorization;
        
        if (!authHeader) {
            return response.send({
                _status: false,
                _message: 'Authorization token is required',
                _data: null
            });
        }

        var token = authHeader.split(' ');
        
        if (!token[1]) {
            return response.send({
                _status: false,
                _message: 'Invalid token format',
                _data: null
            });
        }

        var verifyToken = await jwt.verify(token[1], process.env.secret_key);

        // Find user by ID
        var user = await userModal.findOne({
            _id: verifyToken.userData._id,
            role_type : 'User',
            deleted_at: null
        });

        if (!user) {
            return response.send({
                _status: false,
                _message: 'User not found',
                _data: null
            });
        }

        if(request.body){
            if(!request.body.confirm_password || !request.body.new_password || !request.body.current_password){
                var data = {
                    _status : false,
                    _message : 'Required Field Missings !'
                }

                response.send(data)
            }
        } else {
            var data = {
                _status : false,
                _message : 'Required Field Missings !!'
            }

            response.send(data)
        }

        console.log(request.body);

        var verifyPassword = await bcrypt.compare(request.body.current_password, user.password);

        if(!verifyPassword){
            var data = {
                _status : false,
                _message : 'Current Password is incorrect !'
            }

            response.send(data)
        }

        if(request.body.current_password == request.body.new_password){
            var data = {
                _status : false,
                _message : 'Current Password and new password cannot be same !'
            }

            response.send(data)
        }

        if(request.body.confirm_password != request.body.new_password){
            var data = {
                _status : false,
                _message : 'Confirm Password and new password must be same !'
            }

            response.send(data)
        }

        var updateData = {};

        updateData.password = await bcrypt.hash(request.body.confirm_password, saltRounds);

        // Set updated_at timestamp
        updateData.updated_at = new Date();

        // Update user profile
        var updatedUser = await userModal.findByIdAndUpdate(
            verifyToken.userData._id,
            updateData,
            { new: true, runValidators: true }
        );

        return response.send({
            _status: true,
            _message: 'Change Password successfully',
            _data: updatedUser
        });

    } catch (error) {
        console.error('Update Profile Error:', error);

        if (error.name === 'JsonWebTokenError') {
            return response.send({
                _status: false,
                _message: 'Invalid token',
                _data: null
            });
        }

        if (error.name === 'TokenExpiredError') {
            return response.send({
                _status: false,
                _message: 'Token expired',
                _data: null
            });
        }

        if (error.name === 'ValidationError') {
            var errorMessages = {};
            for (let key in error.errors) {
                errorMessages[key] = error.errors[key].message;
            }

            return response.send({
                _status: false,
                _message: 'Validation error',
                _data: null,
                _error: errorMessages
            });
        }

        var data = {
            _status: false,
            _message: 'Something went wrong!!',
            _data: null,
            _error: error.message
        };

        response.send(data);
    }
}

exports.forgotPassword = async (request, response) => {
    try {
        // Validate email
        if (!request.body.email) {
            return response.send({
                _status: false,
                _message: 'Email is required'
            });
        }

        // Check if user exists
        const user = await userModal.findOne({
            email: request.body.email,
            role_type: 'User',
            deleted_at: null
        });

        if (!user) {
            return response.send({
                _status: false,
                _message: 'User with this email does not exist'
            });
        }

        // Generate reset token (random string)
        const resetToken = require('crypto').randomBytes(32).toString('hex');
        const hashedToken = require('crypto')
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Set token expiry to 1 hour from now
        const expireTime = new Date(Date.now() + 60 * 60 * 1000);

        // Update user with reset token and expiry
        await userModal.findByIdAndUpdate(
            user._id,
            {
                password_reset_token: hashedToken,
                password_reset_expires: expireTime
            },
            { new: true }
        );

        // Send email with reset link
        const resetUrl = `${process.env.frontend_url}/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.gmail_email,
                pass: process.env.gmail_app_password
            }
        });

        const mailOptions = {
            from: process.env.gmail_email,
            to: user.email,
            subject: 'Password Reset Request',
            html: `
                <h2>Password Reset Request</h2>
                <p>Hello ${user.name},</p>
                <p>You requested to reset your password. Click the link below to reset it:</p>
                <p><a href="${resetUrl}" target="_blank">Reset Password</a></p>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
                <p>Best regards,<br/>Your Team</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return response.send({
            _status: true,
            _message: 'Password reset link sent to your email',
            _data: null
        });

    } catch (error) {
        console.error('Forgot Password Error:', error);
        return response.send({
            _status: false,
            _message: 'Something went wrong!',
            _error: error.message
        });
    }
}

exports.resetPassword = async (request, response) => {
    try {
        // Validate required fields
        if (!request.body.reset_token || !request.body.new_password || !request.body.confirm_password) {
            return response.send({
                _status: false,
                _message: 'Reset token and new password are required'
            });
        }

        // Validate passwords match
        if (request.body.new_password !== request.body.confirm_password) {
            return response.send({
                _status: false,
                _message: 'New password and confirm password do not match'
            });
        }

        // Validate password length
        if (request.body.new_password.length < 6) {
            return response.send({
                _status: false,
                _message: 'Password must be at least 6 characters long'
            });
        }

        // Hash the token to compare with stored hash
        const hashedToken = require('crypto')
            .createHash('sha256')
            .update(request.body.reset_token)
            .digest('hex');

        // Find user with valid reset token and expiry not passed
        const user = await userModal.findOne({
            password_reset_token: hashedToken,
            password_reset_expires: { $gt: new Date() },
            deleted_at: null
        });

        if (!user) {
            return response.send({
                _status: false,
                _message: 'Invalid or expired reset token'
            });
        }

        // Hash new password
        const newHashedPassword = await bcrypt.hash(request.body.new_password, saltRounds);

        // Update user password and clear reset token
        const updatedUser = await userModal.findByIdAndUpdate(
            user._id,
            {
                password: newHashedPassword,
                password_reset_token: null,
                password_reset_expires: null,
                updated_at: new Date()
            },
            { new: true }
        );

        return response.send({
            _status: true,
            _message: 'Password reset successfully',
            _data: updatedUser
        });

    } catch (error) {
        console.error('Reset Password Error:', error);
        return response.send({
            _status: false,
            _message: 'Something went wrong!',
            _error: error.message
        });
    }
}