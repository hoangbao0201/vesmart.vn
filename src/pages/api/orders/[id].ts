import prismaService from '@/lib/prismaService';
import orderService from '@/serverless/order.service';
import productService from '@/serverless/product.service';
import type { NextApiRequest, NextApiResponse } from 'next';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body, query } = req;
    const { id } = query;

    switch (method) {
        case 'DELETE':
            try {

                const findOrder = await orderService.findOne(id as string);

                const orderDelete = await orderService.delete(id as string);

                if(findOrder.success && findOrder.order) {
                    const orderList = JSON.parse(findOrder.order?.productsOrder);
                    if(orderList) {
                        for(let i = 0; i < orderList.length; i++) {
                            await productService.reduceStock(orderList[i].skuId, orderList[i].count * -1);
                        }
                    }
                }

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