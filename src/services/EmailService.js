require('dotenv').config()
import nodemailer from 'nodemailer'
let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from: '"ducpham " <pmduc0599@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ", // Subject line
        html: getBodyHTMLEmail(dataSend)
    });
}
let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin Chào ${dataSend.patientName}! </h3>
        <p>Bạn đã nhận được email này vì đã đặt lịch khám bệnh online trên bookingcare </p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div><b>Thời gian: ${dataSend.time} </b></div>
         <div><b>Bác sĩ: ${dataSend.doctorName} </b></div>
            <p>Kiểm tra lại thông tin sau đó click vào link bên dưới để xác nhận hoàn tất thủ
            tục đặt lịch khám bệnh </p>
         <p>
         <div>
         <a href=${dataSend.redirectLink} target="_blank"> Click here </a>
         </div> </p>
     <div>Xin chân thành cảm ơn </div>
        `

    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}! </h3>
        <p>You have received this email because you have set up an online medical appointment on bookingcare </p>
        <p>Appointment information: </p>
        <div><b>Time: ${dataSend.time} </b></div>
         <div><b>Doctor: ${dataSend.doctorName} </b></div>
            <p>Check the information again then click on the link below to confirm the completion of the appointment procedure </p>
         <p>
         <div>
         <a href=${dataSend.redirectLink} target="_blank"> Click here </a>
         </div> </p>
     <div>Thank you very much </div>
         `
    }
    return result
}
let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin Chào ${dataSend.patientName}! </h3>
        <p>Bạn đã nhận được email này vì đã đặt lịch khám bệnh online trên bookingcare thành công</p>
        <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm </p>  
         <div>Xin chân thành cảm ơn </div>
        `

    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}! </h3>
        <p>You have received this email because you have set up an online medical appointment on bookingcare </p>
       
            <p>Check the information again then click on the link below to confirm the completion of the appointment procedure </p>
         <p> bla bla .... </p>
         
     <div>Thank you very much </div>
         `
    }
    return result
}
let sendAttachment = async (dataSend) => {
    // create
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from: '"ducpham " <pmduc0599@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh ", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: 'base64'
            },
        ],
    });
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
}