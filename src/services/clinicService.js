import { reject } from "lodash"
import db from "../models/index"
import { where } from "sequelize"

let CreateNewClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter! '
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.imageBase64,
                    address: data.address,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Save specialty succeed ! '
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    CreateNewClinic: CreateNewClinic,

}