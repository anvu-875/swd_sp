import { catchAsync } from "../utils/catchAsync.js";
import { Campaign} from "../model/campaign.model.js";
export const createCampaign = catchAsync(
    async (req, res, next) => {
        const campaign = await Campaign.create(
            req.body
        )
        res.status(201).json({
            status:'success',
            data: {
                campaign
            }
        })
    }
    )
