

// ============================================================================
// LIST CONTEXT
// ============================================================================

import { Prisma } from "../../../generated/prisma";
import { SelectContext, SelectRole } from "./prisma-select-config";

const listGuest = {
  productId: true,
  name: true,
  slug: true,
  generalInfo: true,
  promotionContent: true,
  warrantyContent: true,
  isFeatured: true,
  createdAt: true,
  updatedAt: true,
  createdBy: {
    select: {
      userId: true,
      name: true,
      avatar: {
        select: {
          image: {
            select: {
              url: true,
              width: true,
              height: true,
              dominantColor: true,
            },
          },
        },
      },
    },
  },
  images: {
    select: {
      image: {
        select: {
          url: true,
          width: true,
          height: true,
          dominantColor: true,
        },
      },
    },
  },
  variants: {
    select: {
      productVariantId: true,
      price: true,
      quantity: true,
      discountPercent: true,
      images: {
        select: {
          image: {
            select: {
              url: true,
            },
          },
        },
      },
      optionValues: {
        select: {
          productOptionValue: {
            select: {
              value: true,
              slug: true,
              productOptionId: true,
            },
          },
        },
      },
    },
  },
} as const satisfies Prisma.ProductV2Select;

const listCreator = {
  ...listGuest,
} as const satisfies Prisma.ProductV2Select;

const listAdmin = {
  ...listCreator,
} as const satisfies Prisma.ProductV2Select;

// ============================================================================
// DETAIL CONTEXT
// ============================================================================

const detailGuest = {
  productId: true,
  name: true,
  slug: true,
  generalInfo: true,
  promotionContent: true,
  warrantyContent: true,
  isFeatured: true,
  createdAt: true,
  updatedAt: true,
  createdBy: {
    select: {
      userId: true,
      name: true,
      avatar: {
        select: {
          image: {
            select: {
              url: true,
              width: true,
              height: true,
              dominantColor: true,
            },
          },
        },
      },
    },
  },
  images: {
    select: {
      image: {
        select: {
          url: true,
          width: true,
          height: true,
          dominantColor: true,
        },
      },
    },
  },
  metas: {
    select: {
      meta: {
        select: {
          metaId: true,
          name: true,
          type: true,
        },
      },
    },
  },
  variants: {
    select: {
      productVariantId: true,
      price: true,
      quantity: true,
      discountPercent: true,
      
      images: {
        select: {
          image: {
            select: {
              url: true,
            },
          },
        },
      },
      optionValues: {
        select: {
          productOptionValue: {
            select: {
              value: true,
              slug: true,
              productOptionId: true,
            },
          },
        },
      },
    },
  },
  options: {
    select: {
      productOptionId: true,
      name: true,
      slug: true,
      values: {
        select: {
          productOptionValueId: true,
          value: true,
          slug: true,
        },
      },
    },
  },
} as const satisfies Prisma.ProductV2Select;

const detailCreator = {
  ...detailGuest,
} as const satisfies Prisma.ProductV2Select;

const detailAdmin = {
  ...detailCreator,
} as const satisfies Prisma.ProductV2Select;

// ============================================================================
// EXPORT CONFIGURATION
// ============================================================================

const selectMapV2 = {
  [SelectContext.LIST]: {
    [SelectRole.GUEST]: listGuest,
    [SelectRole.ADMIN]: listAdmin,
  },
  [SelectContext.DETAIL]: {
    [SelectRole.GUEST]: detailGuest,
    [SelectRole.ADMIN]: detailAdmin,
  },
} as const;

export type ProductV2SelectConfigType = typeof selectMapV2;

export function ProductSelectConfig<
  C extends keyof typeof selectMapV2,
  R extends keyof typeof selectMapV2[C]
>(context: C, role: R) {
  return selectMapV2[context][role];
}