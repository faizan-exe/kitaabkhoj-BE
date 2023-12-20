/**
 *        @file category/index.ts
 *     @summary Category routes
 * @description Handles following routes:
 *              - GET  '/v1/BookShopCatalog'
 *              - POST '/v1/BookShopCatalog'
 *              - PUT '/v1/BookShopCatalog/:id'
 *              - DELETE '/v1/BookShopCatalog/:id'
 *              - GET '/v1/BookShopCatalog/:id'
 */
import express from "express";

import Schema from "../../middlewares/schema";
import BookShopCatalogValidator from "../../Components/BookShopCatalog/Validator/BookShopCatalogValidator";

import { wrapper } from "../../helpers";
import { BookShopCatalogController } from "../../Components/BookShopCatalog/Controllers/BookShopCatalogController";

const router = express.Router();

router.post(
  "/",
  (req, res, next) => {
    Schema.handle(
      req,
      res,
      next,
      BookShopCatalogValidator.createBookShopCatalog()
    );
  },
  wrapper(BookShopCatalogController.create)
);

router.post(
  "/book-media/",
  (req, res, next) => {
    Schema.handle(req, res, next, BookShopCatalogValidator.createBookMedia());
  },
  wrapper(BookShopCatalogController.createBookMedia)
);

router.get("/", wrapper(BookShopCatalogController.index));

router.get("/:bookshop_id", wrapper(BookShopCatalogController.show));

router.get("/item/:id", wrapper(BookShopCatalogController.showItem))

router.delete(
  "/:id",

  wrapper(BookShopCatalogController.destroy)
);

router.put(
  "/:id",
  (req, res, next) => {
    Schema.handle(
      req,
      res,
      next,
      BookShopCatalogValidator.editBookShopCatalog()
    );
  },
  wrapper(BookShopCatalogController.update)
);

export default router;
