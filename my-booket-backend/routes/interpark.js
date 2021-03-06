const express = require("express");
const axios = require("axios");
const router = express.Router();
const config = require("../../config");

const INTERPARK_KEY = config.INTERPARK_KEY || "";
const DOMAIN = "https://book.interpark.com/api";
const SEARCH_API = "/search.api";
const NEWBOOK_API = "/newBook.api";
const BESTSELLER_API = "/bestSeller.api";

// 책 검색
router.get(SEARCH_API, (req, res, next) => {
  const { query, start, queryType } = req.query;
  axios
    .get(DOMAIN + SEARCH_API, {
      params: {
        key: INTERPARK_KEY,
        maxResults: 20,
        output: "json",
        soldOut: "n",
        query,
        queryType,
        start
      }
    })
    .then(result => {
      const data = result.data;
      const { returnCode, returnMessage } = data;
      if (returnCode !== "000") {
        console.error(
          `[search.api Error] (${new Date().toISOString()}) ==> Code:${returnCode} , ${returnMessage}`
        );
      }

      data.item.forEach(book => {
        for (let key in book) {
          if (book.hasOwnProperty(key) && typeof book[key] === "string") {
            book[key] = book[key].replace(/(http):/, "https:");
          }
        }
      });

      res.json(data);
    })
    .catch(error => {
      const status = error.response.status;
      res.json({ error: status });
    });
});

// 신간도서 조회
router.get(NEWBOOK_API, (req, res, next) => {
  axios
    .get(DOMAIN + NEWBOOK_API, {
      params: {
        key: INTERPARK_KEY,
        categoryId: 100,
        output: "json"
      }
    })
    .then(result => {
      const data = result.data;
      const { returnCode, returnMessage, item } = data;
      if (returnCode !== "000") {
        console.error(
          `[newBook.api Error] (${new Date().toISOString()}) ==> Code:${returnCode} , ${returnMessage}`
        );
      }

      data.item.forEach(book => {
        for (let key in book) {
          if (book.hasOwnProperty(key) && typeof book[key] === "string") {
            book[key] = book[key].replace(/(http):/, "https:");
          }
        }
      });

      res.json({ item });
    })
    .catch(error => {
      const status = error.response.status;
      res.json({ error: status });
    });
});

// 베스트셀러 조회
router.get(BESTSELLER_API, (req, res, next) => {
  axios
    .get(DOMAIN + BESTSELLER_API, {
      params: {
        key: INTERPARK_KEY,
        categoryId: 100,
        output: "json"
      }
    })
    .then(result => {
      const data = result.data;
      const { returnCode, returnMessage, item } = data;
      if (returnCode !== "000") {
        console.error(
          `[bestsellor.api Error] (${new Date().toISOString()}) ==> Code:${returnCode} , ${returnMessage}`
        );
      }
      data.item.forEach(book => {
        for (let key in book) {
          if (book.hasOwnProperty(key) && typeof book[key] === "string") {
            book[key] = book[key].replace(/(http):/, "https:");
          }
        }
      });
      res.json({ item });
    })
    .catch(error => {
      const status = error.response.status;
      res.json({ error: status });
    });
});
module.exports = router;
