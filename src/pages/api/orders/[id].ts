import prismaService from '@/lib/prismaService';
import orderService from '@/serverless/order.service';
import type { NextApiRequest, NextApiResponse } from 'next';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body, query } = req;
    const { id } = query;

    switch (method) {
        case 'DELETE':
            try {
                const orderDelete = await orderService.delete(id as string);

                res.status(200).json(orderDelete);
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err
                });
            }
            break;

        default:
            res.status(500).json({
                success: false,
                message: 'Method not matches',
            });
    }
};

export default handle;