

// ============================================================================
// LIST CONTEXT
// ============================================================================

import { Prisma } from "../../../generated/prisma";
import { SelectContext, SelectRole } from "./prisma-select-config";

const listGuest = {
  postId: true,
  slug: true,
  title: true,
  createdAt: true,
  updatedAt: true,
  user: {
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
            }
          }
        }
      }
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
        }
      }
    },
  },
  metas: {
    select: {
      meta: {
        select: {
          metaId: true,
          name: true,
        }
      }
    },
  },
  // comments: {
  //   select: {},
  // },
} as const satisfies Prisma.PostV2Select;

const listCreator = {
  ...listGuest,
} as const satisfies Prisma.PostV2Select;

const listAdmin = {
  ...listCreator,
} as const satisfies Prisma.PostV2Select;

// ============================================================================
// DETAIL CONTEXT
// ============================================================================

const detailGuest = {
  postId: true,
  slug: true,
  title: true,
  content: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  user: {
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
            }
          }
        }
      }
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
        }
      }
    },
  },
  metas: {
    select: {
      meta: {
        select: {
          metaId: true,
          name: true,
          type: true,
        }
      }
    },
  },
  products: {
    select: {
      product: {
        select: {
          name: true,
          images: {
            select: {
              image: {
                select: {
                  url: true,
                  width: true,
                  height: true,
                  dominantColor: true,
                }
              }
            },
          }
        }
      }
    },
  },
  // comments: {
  //   select: {},
  // },
} as const satisfies Prisma.PostV2Select;

const detailCreator = {
  ...detailGuest,
} as const satisfies Prisma.PostV2Select;

const detailAdmin = {
  ...detailCreator,
} as const satisfies Prisma.PostV2Select;

// ============================================================================
// EXPORT CONFIGURATION
// ============================================================================

const selectMap = {
  [SelectContext.LIST]: {
    [SelectRole.GUEST]: listGuest,
    [SelectRole.ADMIN]: listAdmin,
  },
  [SelectContext.DETAIL]: {
    [SelectRole.GUEST]: detailGuest,
    [SelectRole.ADMIN]: detailAdmin,
  },
} as const;

export type PostSelectConfigType = typeof selectMap;

export function PostSelectConfig<
  C extends keyof typeof selectMap,
  R extends keyof typeof selectMap[C]
>(context: C, role: R) {
  return selectMap[context][role];
}