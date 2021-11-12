
//import fetch from 'node-fetch';
"use strict";
const keepAlive = require('./server');
const { createCanvas, loadImage } = require('canvas')
var Chart = require('chart.js');
var TinyURL = require('tinyurl');
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
var mysql = require('mysql');
var makeShortUrl = require("@short-url/shorturl").makeShortUrl;
const QuickChart = require('quickchart-js');
let fetch = require('node-fetch');
let {
  Client,
  Intents
} = require('discord.js');
const Discord = require("discord.js");
//"iopjklnm44@"
const {
  input,dblist
} = require("./input.json")

const {
  token
} = process.env.DISCORD_TOKEN // use the require method

const client = new Client({
  intents: [Intents.FLAGS.GUILDS]
});
const mySecret = process.env['password'];

const usr = process.env['USERNAME'];

const db = process.env['DATABASE'];


const host = process.env['HOST'];

let array = [];
// function to get the raw data
const getRawData = (URL) => {
  return fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

// URL for data
let item = "乾淨滅龍";
let section = 0;
let blank = 0;
let bool = true
let URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
let maxrange = 7000;
let minrange = 2000;
let count = 0;
let map = new Map();
let result = "";
let msging = true;
// start of the program
client.on("ready", () => {
  client.login(token);
  console.log(`Logged in as ${client.user.tag}!`)
  //console.log(client.channels.cache.get("418076288625016834").send("login...."));
})




client.on("message", async msg => {
  if (msg.channel.id === "418076288625016834" ||
    msg.channel.id === "418076288625016834" ||
    msg.channel.id === "902027471078174820") {
    let item = "";
    let section = 0;
    let blank = 0;
    let bool = true
    let URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
    let maxrange = 50000;
    let minrange = 2000;
    let count = 0;
    let map = new Map();
    let result = "";
    var check = "&&1743";
    let search = false;

    function return_result() {
      return result;
    }
    const tyt = async function(item, maxrange, minrange) {
      result = "";

      // start of the program

      result = "";

      while (bool) {
        await sleep(200);
        const ttempp = "https://cors-anywhere.herokuapp.com/";
        URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
        //URL=ttempp.concat(URL);
        console.log(URL);
        const _constdata = await getRawData(URL);
        let data = _constdata;
        for (let i = 0; i < 26; i++) {

          let index_bottom = data.search("元</b>");
          data = data.substr(index_bottom - 10);
          let index_top = data.search("<b>") + 3;
          index_bottom = data.search("</b>") - 1;
          //console.log(data.substr(index_top, index_bottom - index_top));
          let temp = data.substr(index_top, index_bottom - index_top);

          temp = temp.replace(',', '');
          temp = parseInt(temp);

          if (temp > minrange && temp < maxrange && temp != 8591) {
            count++;
            if (data.substr(index_top, index_bottom - index_top) != "") array.push(temp);
          }
          if (data.substr(index_top, index_bottom - index_top) == "") blank++;
          data = data.substr(index_bottom + 100);

        }
        if (blank < 20) {
          section += 21;
          blank = 0;
        };
        if (blank >= 20) bool = false;
        if (section > 1200) bool = false;
      }
      array.sort(compareDecimals);
      console.log(array);
      let avg = 0;
      for (let i = 0; i < array.length; i++) {
        avg += array[i];
      }
      console.log(item + " 樣本數:" + count + " 平均價:" + (avg / count));
      result += item + " 樣本數:" + count + " 平均價格:" + (avg / count) + "\r";
      if (count < 50) {
        console.log("樣本數低於50 平均價格不夠準確");
        result += "樣本數低於50 平均價格不夠準確\r";
      }

      for (let i = 0; i < array.length; i++) {
        if (map.has(array[i])) {
          let num = map.get(array[i]);
          num++;
          map.set(array[i], num);
        }
        if (!map.has(array[i])) {
          map.set(array[i], 1);
        }

      }
      if (array.length > 0) {
        let time = parseInt(array.length / 15);
        let max = 0;
        let times = 0;
        let arr = [];


        let mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

        for (const [key, value] of mapSort1.entries()) {
          if (times != mapSort1.size && times <= time && value > 1) {
            arr.push(key);
            mapSort1.delete(key);
            times++;

          }

        }
        let arr_avg = 0;
        arr.sort(compareDecimals)
        //if (arr.length > 3) arr.pop();
        arr.reverse();
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          max += arr[i];
        }
        arr_avg = max / (arr.length);
        if (arr.length >= 3) {
          max = 0;
          let arrlen = arr.length;
          let ct = 0;

          let index = arr.length / 2;
          if (index < 2) {
            arr_avg = arr[1];

          } else if (index >= 2) {

            index = Math.floor(index);
            index = (index + arr.length - 1) / 2
            index = Math.floor(index)
            if (arr[index] / arr[index + 1] < 2) arr_avg = (arr[index] + arr[index + 1]) / 2;
            if (arr[index] / arr[index + 1] >= 2) arr_avg = arr[index];
          }
          if (arr.length > 25) {
            index = arr.length / 2;
            index = Math.floor(index);
            arr_avg = (arr[index] + arr[index + 1]) / 2;

          }

          //arr_avg=arr_avg/arr.length;
          console.log(arr_avg)
          for (let i = 0; i < 10; i++) {
            ct = 0;
            while (ct < arr.length) {

              if (arr[ct] / arr_avg >= 2) {
                arr.splice(ct, 1);

              } else if (arr[ct] / arr_avg <= 0.5) {
                arr.splice(ct, 1);

              } else if (arr[ct] / arr_avg < 2 || arr[ct] / arr_avg > 0.5) {
                if (i == 9) max += arr[ct]
                ct++;

              }



            }

          }
        }
        console.log(arr)

        mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
        let keys = Array.from(mapSort1.keys());
        keys.sort(compareDecimals);
        result += "\r\n建議最大最小價格設定值:\r\n" + Math.floor((max / (arr.length)) * 8) + "~" + Math.floor((max / (arr.length)) * 3 / 100);
        let possible_pr = 0;
        if (max / (arr.length) > arr_avg) possible_pr = (max / (arr.length)) * 0.9
        if (max / (arr.length) <= arr_avg) possible_pr = (max / (arr.length))
        result += "\r\n可能最佳價格:\r\n" + possible_pr;
        // result += "\r\n最小可能價格:\r\n"
        /* if (keys.length >= 20) {
           for (let i = 0; i < 20; i++) {
             result += "\r\n" + keys[i];
           }
         } else if (keys.length < 20) {
           for (let i = 0; i < keys.length; i++) {
             result += "\r\n" + keys[i];
           }
         }*/
        array.length = 0

      }


      console.log(map)
      return map;

    };







    function reset() {
      section = 0;
      blank = 0;
      bool = true;
      map.clear();
      count = 0;
      result = "";

    }
    const fyi = async function(item, maxrange, minrange) {
      result = "";

      // start of the program
      let array = []
      result = "";

      while (bool) {
        await sleep(200);

        //URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
        URL = "https://www.8591.com.tw/mallList-list.html?searchGame=859&buyStatus=1&searchKey=" + item + "&firstRow=" + section;
        //URL=ttempp.concat(URL);
        console.log(URL);
        const _constdata = await getRawData(URL);
        let data = _constdata;
        for (let i = 0; i < 26; i++) {

          let index_bottom = data.search("元</b>");
          data = data.substr(index_bottom - 10);
          let index_top = data.search("<b>") + 3;
          index_bottom = data.search("</b>") - 1;
          //console.log(data.substr(index_top, index_bottom - index_top));
          let temp = data.substr(index_top, index_bottom - index_top);

          temp = temp.replace(',', '');
          temp = parseInt(temp);

          if (temp > minrange && temp < maxrange && temp != 8591) {
            count++;
            if (data.substr(index_top, index_bottom - index_top) != "") array.push(temp);
          }
          if (data.substr(index_top, index_bottom - index_top) == "") blank++;
          data = data.substr(index_bottom + 100);
        }
        if (blank < 20) {
          section += 21;
          blank = 0;
        };
        if (blank >= 20) bool = false;
        if (section > 1000) bool = false;
      }
      array.sort(compareDecimals);
      console.log(array);
      let avg = 0;
      for (let i = 0; i < array.length; i++) {
        avg += array[i];
      }
      console.log(item + " 樣本數:" + count + " 平均價:" + (avg / count));
      result += item + " 樣本數:" + count + " 平均價格:" + (avg / count) + "\r";
      if (count < 50) {
        console.log("樣本數低於50 平均價格不夠準確");
        result += "樣本數低於50 平均價格不夠準確\r";
      }

      for (let i = 0; i < array.length; i++) {
        if (map.has(array[i])) {
          let num = map.get(array[i]);
          num++;
          map.set(array[i], num);
        }
        if (!map.has(array[i])) {
          map.set(array[i], 1);
        }

      }
      if (array.length > 0) {
        let time = parseInt(array.length / 15);
        let max = 0;
        let times = 0;
        let arr = [];


        let mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

        for (const [key, value] of mapSort1.entries()) {
          if (times != mapSort1.size && times <= time && value > 1) {
            arr.push(key);
            mapSort1.delete(key);
            times++;

          }

        }
        let arr_avg = 0;
        arr.sort(compareDecimals)
        //if (arr.length > 3) arr.pop();
        arr.reverse();
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          max += arr[i];
        }
        arr_avg = max / (arr.length);
        if (arr.length >= 3) {
          max = 0;
          let arrlen = arr.length;
          let ct = 0;

          let index = arr.length / 2;
          if (index < 2) {
            arr_avg = arr[1];

          } else if (index >= 2) {

            index = arr.length / 2;
            index = Math.floor(index);
            arr_avg = (arr[index] + arr[index + 1]) / 2;
          }
          if (arr.length > 25) {
            index = arr.length / 2;
            index = Math.floor(index);
            arr_avg = (arr[index] + arr[index + 1]) / 2;

          }

          //arr_avg=arr_avg/arr.length;
          console.log(arr_avg)
          for (let i = 0; i < 10; i++) {
            ct = 0;
            while (ct < arr.length) {

              if (arr[ct] / arr_avg >= 1.5) {
                arr.splice(ct, 1);

              } else if (arr[ct] / arr_avg <= 0.67) {
                arr.splice(ct, 1);

              } else if (arr[ct] / arr_avg < 1.5 || arr[ct] / arr_avg > 0.67) {
                if (i == 9) max += arr[ct]
                ct++;

              }



            }

          }
        }
        console.log(arr)

        mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
        let keys = Array.from(mapSort1.keys());
        keys.sort(compareDecimals);
        result += "\r\n建議最大最小價格設定值:\r\n" + Math.floor((max / (arr.length)) * 8) + "~" + Math.floor((max / (arr.length)) * 3 / 100);
        let possible_pr = 0;
        if (max / (arr.length) > arr_avg) possible_pr = (max / (arr.length)) * 0.9
        if (max / (arr.length) <= arr_avg) possible_pr = (max / (arr.length))
        result += "\r\n可能最佳價格:\r\n" + possible_pr;
        /* result += "\r\n最小可能價格:\r\n"
         if (keys.length >= 20) {
           for (let i = 0; i < 20; i++) {
             result += "\r\n" + keys[i];
           }
         } else if (keys.length < 20) {
           for (let i = 0; i < keys.length; i++) {
             result += "\r\n" + keys[i];
           }
         }*/
        array.length = 0

      }
      console.log(result)

      console.log(map)
      return map;
    };
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    if (msg.content === "乾淨滅龍") {
      item = "乾淨滅龍";
      maxrange = 7000;
      minrange = 2000;
      check = "乾淨滅龍";
      search = true;
    } else if (msg.content === "輪迴") {
      item = "輪迴";
      maxrange = 100000;
      minrange = 30000;
      check = "輪迴";
      search = true;
    } else if (msg.content === "武公寶珠") {
      item = "武公寶珠";
      maxrange = 7000;
      minrange = 3000;
      check = "武公寶珠";
      search = true;
    } else if (msg.content === "戰女") {
      item = "戰女";
      maxrange = 10000;
      minrange = 500;
      check = "戰女";
      search = true;
    } else if (msg.content === "戰男") {
      item = "戰男";
      maxrange = 10000;
      minrange = 500;
      check = "戰男";
      search = true;

    } else if (msg.content === "乾淨天上") {
      item = "乾淨天上";
      maxrange = 10000;
      minrange = 1000;
      check = "乾淨天上";
      search = true;
    } else if (msg.content === "燃燒戒指") {
      item = "燃燒戒指";
      maxrange = 10000;
      minrange = 1000;
      check = "燃燒戒指";
      search = true;
    } else if (msg.content === "艾戒") {
      item = "艾戒";
      maxrange = 10000;
      minrange = 1000;
      check = "艾戒";
      search = true;
    } else if (msg.content === "苦行") {
      item = "苦行";
      maxrange = 10000;
      minrange = 1000;
      check = "苦行";
      search = true;
    } else if (msg.content === "苦痛") {
      item = "苦痛";
      maxrange = 15000;
      minrange = 1000;
      check = "苦痛";
      search = true;
    } else if (msg.content === "巨大的恐怖") {
      item = "巨大的恐怖";
      maxrange = 15000;
      minrange = 1000;
      check = "巨大的恐怖";
      search = true;
    } else if (msg.content === "精靈墜飾") {
      item = "精靈墜飾";
      maxrange = 10000;
      minrange = 1000;
      check = "精靈墜飾";
      search = true;

    } else if (msg.content === "眼球") {
      item = "眼球";
      maxrange = 15000;
      minrange = 1000;
      check = "眼球";
      search = true;
    } else if (msg.content === "小筱") {
      item = "小筱";
      maxrange = 8000;
      minrange = 1000;
      check = "小筱";
      search = true;
    } else if (msg.content === "MX131") {
      item = "MX131";
      maxrange = 5000;
      minrange = 1000;
      check = "MX131";
      search = true;
    } else if (msg.content === "黑翼") {
      item = "黑翼";
      maxrange = 7000;
      minrange = 1000;
      check = "黑翼";
      search = true;
    } else if (msg.content === "乾淨死神") {
      item = "乾淨死神";
      maxrange = 2000;
      minrange = 100;
      check = "乾淨死神";
      search = true;
    } else if (msg.content === "內面耀光") {
      item = "內面耀光";
      maxrange = 4000;
      minrange = 500;
      check = "內面耀光";
      search = true;
    } else if (msg.content === "雙總魔") {
      item = "雙總魔";
      maxrange = 10000;
      minrange = 4500;
      check = "雙總魔";
      search = true;
    } else if (msg.content === "雙終魔") {
      item = "雙終魔";
      maxrange = 10000;
      minrange = 4500;
      check = "雙終魔";
      search = true;
    } else if (msg.content === "雙總物") {
      item = "雙總物";
      maxrange = 23000;
      minrange = 8500;
      check = "雙總物";
      search = true;
    } else if (msg.content === "雙終物") {
      item = "雙終物";
      maxrange = 23000;
      minrange = 8500;
      check = "雙終物";
      search = true;
    } else if (msg.content === "三加持") {
      item = "三加持";
      maxrange = 19000;
      minrange = 2500;
      check = "三加持";
      search = true;
    } else if (msg.content === "雙終") {
      item = "雙終";
      maxrange = 3000;
      minrange = 1000;
      check = "雙終";
      search = true;
    } else if (msg.content === "雙總") {
      item = "雙總";
      maxrange = 3000;
      minrange = 1000;
      check = "雙總";
      search = true;
    } else if (msg.content === "三總") {
      item = "三總";
      maxrange = 200000;
      minrange = 70000;
      check = "三總";
      search = true;
    } else if (msg.content === "三終") {
      item = "三終";
      maxrange = 200000;
      minrange = 70000;
      check = "三終";
      search = true;
    } else if (msg.content === "女武神") {
      item = "女武神";
      maxrange = 5000;
      minrange = 2500;
      check = "女武神";
      search = true;
    } else if (msg.content === "md") {
      item = "md";
      maxrange = 25000;
      minrange = 14000;
      check = "md";
      search = true;
    } else if (msg.content === "p寵") {
      item = "p寵";
      maxrange = 8000;
      minrange = 2000;
      check = "p寵";
      search = true;
    } else if (msg.content === "露耳") {
      item = "露耳";
      maxrange = 3000;
      minrange = 300;
      check = "露耳";
      search = true;
    } else if (msg.content === "20星") {
      item = "20星";
      maxrange = 5500;
      minrange = 2000;
      check = "20星";
      search = true;
    } else if (msg.content === "19星") {
      item = "19星";
      maxrange = 2000;
      minrange = 800;
      check = "19星";
      search = true;
    } else if (msg.content === "追加100") {
      item = "追加100";
      maxrange = 4000;
      minrange = 1800;
      check = "追加100";
      search = true;
    } else if (msg.content === "追加50") {
      item = "追加50";
      maxrange = 2000;
      minrange = 500;
      check = "追加50";
      search = true;
    } else if (msg.content === "追加30") {
      item = "追加30";
      maxrange = 1500;
      minrange = 200;
      check = "追加30";
      search = true;
    } else if (msg.content === "口紅") {
      item = "口紅";
      maxrange = 6000;
      minrange = 2000;
      check = "口紅";
      search = true;
    } else if (msg.content === "眼罩") {
      item = "眼罩";
      maxrange = 6000;
      minrange = 2000;
      check = "眼罩";
      search = true;
    } else if (msg.content === "魔導書") {
      item = "魔導書";
      maxrange = 6000;
      minrange = 2000;
      check = "魔導書";
      search = true;
    } else if (msg.content === "音樂蔥") {
      item = "音樂蔥";
      maxrange = 7000;
      minrange = 2000;
      check = "音樂蔥";
      search = true;
    } else if (msg.content === "幽暗") {
      item = "幽暗";
      maxrange = 8000;
      minrange = 1000;
      check = "幽暗";
      search = true;
    } else if (msg.content === "白槌") {
      item = "白槌";
      maxrange = 130;
      minrange = 40;
      check = "白槌";
      search = true;
    } else if (msg.content === "影子刀") {
      item = "影子刀";
      maxrange = 16000;
      minrange = 2000;
      check = "影子刀";
      search = true;
    } else if (msg.content === "血刀") {
      item = "血刀";
      maxrange = 19000;
      minrange = 5000;
      check = "血刀";
      search = true;
    } else if (msg.content === "紅武士之刃") {
      item = "紅武士之刃";
      maxrange = 5000;
      minrange = 1000;
      check = "紅武士之刃";
      search = true;
    } else if (msg.content === "懸賞葫蘆") {
      item = "懸賞葫蘆";
      maxrange = 1000;
      minrange = 300;
      check = "懸賞葫蘆";
      search = true;
    } else if (msg.content === "30%滅龍") {
      item = "30%滅龍";
      maxrange = 8000;
      minrange = 4000;
      check = "30%滅龍";
      search = true;
    } else if (msg.content === "33%滅龍") {
      item = "33%滅龍";
      maxrange = 8000;
      minrange = 4500;
      check = "33%滅龍";
      search = true;
    } else if (msg.content === "36%滅龍") {
      item = "36%滅龍";
      maxrange = 9000;
      minrange = 5000;
      check = "36%滅龍";
      search = true;
    } else if (msg.content === "39%滅龍") {
      item = "39%滅龍";
      maxrange = 14000;
      minrange = 6800;
      check = "39%滅龍";
      search = true;
    } else if (msg.content === "33%口紅") {
      item = "33%口紅";
      maxrange = 10000;
      minrange = 4000;
      check = "33%口紅";
      search = true;
    } else if (msg.content === "36%口紅") {
      item = "36%口紅";
      maxrange = 12000;
      minrange = 5000;
      check = "36%口紅";
      search = true;
    } else if (msg.content === "39%口紅") {
      item = "39%口紅";
      maxrange = 14000;
      minrange = 6000;
      check = "39%口紅";
      search = true;
    } else if (msg.content === "33%眼罩") {
      item = "33%眼罩";
      maxrange = 10000;
      minrange = 4000;
      check = "33%眼罩";
      search = true;
    } else if (msg.content === "36%眼罩") {
      item = "36%眼罩";
      maxrange = 12000;
      minrange = 5000;
      check = "36%眼罩";
      search = true;
    } else if (msg.content === "39%眼罩") {
      item = "39%眼罩";
      maxrange = 14000;
      minrange = 6000;
      check = "39%眼罩";
      search = true;
    } else if (msg.content === "36%頂培") {
      item = "36%頂培";
      maxrange = 6000;
      minrange = 2000;
      check = "36%頂培";
      search = true;
    } else if (msg.content === "33%頂培") {
      item = "33%頂培";
      maxrange = 3000;
      minrange = 500;
      check = "33%頂培";
      search = true;
    } else if (msg.content === "30%頂培") {
      item = "30%頂培";
      maxrange = 3000;
      minrange = 500;
      check = "30%頂培";
      search = true;
    } else if (msg.content === "39%大魔") {
      item = "39%大魔";
      maxrange = 8000;
      minrange = 3000;
      check = "39%大魔";
      search = true;
    } else if (msg.content === "36%大魔") {
      item = "36%大魔";
      maxrange = 6000;
      minrange = 1500;
      check = "36%大魔";
      search = true;
    } else if (msg.content === "33%大魔") {
      item = "33%大魔";
      maxrange = 2000;
      minrange = 500;
      check = "33%大魔";
      search = true;
    } else if (msg.content === "33%小魔") {
      item = "33%小魔";
      maxrange = 2000;
      minrange = 500;
      check = "33%小魔";
      search = true;
    } else if (msg.content === "36%小魔") {
      item = "36%小魔";
      maxrange = 4000;
      minrange = 1000;
      check = "36%小魔";
      search = true;
    } else if (msg.content === "39%小魔") {
      item = "39%小魔";
      maxrange = 6000;
      minrange = 1500;
      check = "39%小魔";
      search = true;
    } else if (msg.content === "覺醒刀片") {
      item = "覺醒刀片";
      maxrange = 30000;
      minrange = 10000;
      check = "覺醒刀片";
      search = true;
    } else if (msg.content === "36%女武神") {
      item = "36%女武神";
      maxrange = 12000;
      minrange = 4000;
      check = "36%女武神";
      search = true;
    } else if (msg.content === "33%女武神") {
      item = "33%女武神";
      maxrange = 7000;
      minrange = 3000;
      check = "33%女武神";
      search = true;
    } else if (msg.content === "30%女武神") {
      item = "30%女武神";
      maxrange = 5000;
      minrange = 3000;
      check = "30%女武神";
      search = true;
    } else if (msg.content === "三爆") {
      item = "三爆";
      maxrange = 40000;
      minrange = 10000;
      check = "三爆";
      search = true;
    } else if (msg.content === "傳說100%") {
      item = "傳說100%";
      maxrange = 1800;
      minrange = 300;
      check = "傳說100%";
      search = true;
    } else if (msg.content === "傳說50%") {
      item = "傳說50%";
      maxrange = 1000;
      minrange = 300;
      check = "傳說50%";
      search = true;
    } else if (msg.content === "HD傳說") {
      item = "HD傳說";
      maxrange = 600;
      minrange = 50;
      check = "HD傳說";
      search = true;
    } else if (msg.content === "30%天上") {
      item = "30%天上";
      maxrange = 8000;
      minrange = 4000;
      check = "30%天上";
      search = true;
    } else if (msg.content === "33%天上") {
      item = "33%天上";
      maxrange = 11000;
      minrange = 5000;
      check = "33%天上";
      search = true;
    } else if (msg.content === "36%天上") {
      item = "36%天上";
      maxrange = 15000;
      minrange = 6000;
      check = "36%天上";
      search = true;
    } else if (msg.content === "17星") {
      item = "17星";
      maxrange = 1000;
      minrange = 100;
      check = "17星";
      search = true;
    } else if (msg.content === "16星") {
      item = "16星";
      maxrange = 1000;
      minrange = 100;
      check = "16星";
      search = true;
    } else if (msg.content === "15星") {
      item = "15星";
      maxrange = 1000;
      minrange = 20;
      check = "15星";
      search = true;
    } else if (msg.content.includes("!!(") && msg.content.includes("物品名稱") === false) {
      msg.content = msg.content.replace("!!", "");
      msg.content = msg.content.replace("(", "");
      msg.content = msg.content.replace(")", "");
      let spl = msg.content.split(",")
      maxrange = parseInt(spl[1]);
      minrange = parseInt(spl[2]);
      item = spl[0];
      check = spl[0];
      msg.content = check;
      search = true;
      if (maxrange < minrange) {
        msg.reply("wrong format");
        msg.reply("!!(物品名稱,最大金額,最小金額)");
        search = false;
      }
      if (Number.isInteger(maxrange) != true || Number.isInteger(minrange) != true) {
        msg.reply("wrong format");
        msg.reply("!!(物品名稱,最大金額,最小金額)");
        search = false;
      }
      if (spl.length != 3) {
        msg.reply("wrong format");
        msg.reply("!!(物品名稱,最大金額,最小金額)");
        search = false;
      }
    } else {
      search = false;
    }
    if (msging == false) {
      msg.content = "";
      search = false;
      // msg.reply("bot searching other stuff");
    }
    if (msg.content === "mute my self") {
      msging = false;
      msg.content = "";
      search = false;

    }
    if (msg.content === "not mute my self") {
      msging = true;
      console.log("not mute my self")
    }

    if (msg.content === check && search == true && msg.content.length <= 30 && msging == true) {
      let labels = [];
      let data = {};
      let config = {};
      let temp = [];
      let temp_t = [];
      let output = "";
      msging = false;
      msg.reply("wait for it 搜尋中稍等 (請勿連續輸入，快速連續輸入會導致輸出錯誤)");
      msg.reply("mute my self");
      // start of the program
      msging = false;
      result = "";


      await tyt(item, maxrange, minrange);
      output += return_result();
      var mapAsc = new Map(
        Array
          .from(map)
          .sort((a, b) => {
            // a[0], b[0] is the key of the map
            return a[0] - b[0];
          })
      )
      let map_temp1 = new Map();
      let map_temp2 = new Map();
      for (const [key, value] of mapAsc.entries()) {
        map_temp1.set(key, value);
        map_temp2.set(key, 0);
      }
      reset();
      await fyi(item, maxrange, minrange);
      output = "\r\n--成交價--\r\n" + return_result() + "\r\n\r\n--未成交價--\r\n" + output;

      var mapSale = new Map(
        Array
          .from(map)
          .sort((a, b) => {
            // a[0], b[0] is the key of the map
            return a[0] - b[0];
          })
      )

      for (const [key, value] of mapSale.entries()) {
        if (!map_temp1.has(key)) map_temp1.set(key, 0);
        map_temp2.set(key, value);
      }
      var mapAsc_temp = new Map(
        Array
          .from(map_temp1)
          .sort((a, b) => {
            // a[0], b[0] is the key of the map
            return a[0] - b[0];
          })
      )
      var mapSale_temp = new Map(
        Array
          .from(map_temp2)
          .sort((a, b) => {
            // a[0], b[0] is the key of the map
            return a[0] - b[0];
          })
      )
      console.log("--------------------------------------------\n")
      console.log(mapAsc_temp)
      console.log(mapSale_temp)
      for (const [key, value] of mapAsc_temp.entries()) {
        labels.push(key);
        let iop = parseInt(value);
        temp.push(iop);
      }
      for (const [key, value] of mapSale_temp.entries()) {
        let iop = parseInt(value);
        temp_t.push(iop);
      }


      array.length = 0
      msging = true;
      await msg.reply(output)

      const chart = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: "未成交" + item,
            data: temp
          }, {
            label: "成交" + item,
            data: temp_t
          }]
        }
      }
      const encodedChart = encodeURIComponent(JSON.stringify(chart));
      const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;
      console.log(chartUrl);
      const chartEmbed = {
        title: 'Latest Chart',
        description: '價格走線圖示',
        image: {
          url: chartUrl,
        },
      };

      TinyURL.shorten(chartUrl, function(res, err) {
        if (err)
          console.log(err)
        console.log(res);
        msg.channel.send(res);
      });
      await msg.channel.send({ embed: chartEmbed });
      //await msg.reply(chartUrl)


      if (count === 0) {
        await msg.reply("no result")
        msging = true;
      }


    }

    if (msg.content === "幣值" && msging === true) {
      msg.reply("wait for it 搜尋中稍等");
      msg.reply("mute my self");
      result = "";
      while (bool) {
        msging = false;
        await sleep(200);
        URL = "https://www.8591.com.tw/mallList-list.html?searchGame=859&searchServer=0&buyStatus=1&searchType=0&searchKey=&firstRow=" + section;
        console.log(URL);
        const _constdata = await getRawData(URL);
        let data = _constdata;
        for (let i = 0; i < 26; i++) {
          if (data.includes("我收購的商品")) {
            let index_bottom = data.search("我收購的商品");
            data = data.substr(index_bottom + 1);
          }
          let index_bottom = data.search("元【1");
          data = data.substr(index_bottom - 15);
          index_bottom = data.search("\"") + 1;
          data = data.substr(index_bottom);
          let index_top = 0;
          index_bottom = data.search("】");
          let temp = data.substr(index_top, index_bottom - index_top + 1);
          //console.log(temp);
          if (temp != "") array.push(temp);
          if (temp == "") blank++
          data = data.substr(50);
        }
        if (blank < 20) {
          section += 20;
          blank = 0;
        };
        if (blank >= 20) bool = false;
        if (section > 1000) bool = false;
      }
      console.log(array)
      let arr = [];

      // console.log(temp)
      for (let i = 0; i < array.length; i++) {
        let id = array[i].search(":");
        let id_bottom = array[i].search("萬】");
        let temp = array[i].substr(id + 1, id_bottom - id - 1)
        let int = parseInt(temp);
        int = Math.round(int)
        arr.push(int)
      }
      arr.sort(compareDecimals);
      arr.reverse();
      console.log(arr)
      result += "最高可能價格:\n";
      for (var i = 0; i < 10; i++) {
        if(arr[i]<=3000){
          if (arr.length > 6 && arr[i] / arr[i + 1] < 2){
          result += "1:" + arr[i] + "萬\n";
          }
          }
      }
      msging = true;
      await msg.reply(result);
      array.length = 0
      arr.length = 0
    }


    if (msg.content === "help") {
      msg.reply("wait for it 請使用下列指令才會有回復");
      result = "";
      result = input;
      msg.channel.send("---------------------------");
      msg.reply("機器人問題輸入  作者資訊");
      msg.channel.send("---------------------------");
      msg.reply("指令沒有的請打  !!(物品名稱,最大金額,最小金額) ");
      msg.channel.send("---------------------------");
      msg.reply("列出部分當日物品漲跌  !list");
      msg.channel.send("---------------------------");
      msg.channel.send("以下查詢歷史價格 可查詢物件有限");
      msg.channel.send("可查詢物件:"+dblist);
      msg.channel.send("查詢歷史價格  history(物件,yy,mm,dd,yy,mm,dd) ");
      msg.channel.send("查詢歷史成交價格圖表  hischart(物件,yy,mm,dd,yy,mm,dd) ");
      msg.channel.send("查詢歷史未成交價格圖表  currentchart(物件,yy,mm,dd,yy,mm,dd) ");
      msg.channel.send("---------------------------");
      msg.reply("以下指令直接輸入即可不用加符號，一次只能查一個")
      msg.channel.send(result);
      msg.channel.send("---------------------------");
      msg.channel.send("查詢歷史幣值  hismoney(yy,mm,dd,yy,mm,dd)");
      msg.channel.send("---------------------------");
      msg.channel.send("有任何問題可以到巴哈留言");
      msg.channel.send("https://forum.gamer.com.tw/C.php?bsn=7650&snA=1018172&tnum=2");
      msg.channel.send("---------------------------");
      msg.channel.send("機器人當掉輸入 !logout");
      msg.channel.send("---------------------------");

      msg.channel.send("相關事宜輸入 免責聲明");


      result = "";

    }
    if (msg.content === "作者資訊") {


      msg.reply("巴哈 https://forum.gamer.com.tw/C.php?bsn=7650&snA=1018172&page=1&gothis=6379363#6379363");
      msg.channel.send("Discord Loordb#9562");
      msg.channel.send("Github/replit https://github.com/yuchinchenTW");
      msg.channel.send("楓之谷ID 艾麗雅:無叉叉無雙");



    }


    if (msg.content === "免責聲明") {


      msg.reply("免責聲明 一切下載及使用軟件時均被視為已經仔細閱讀並完全同意以下條款：\n軟件僅供個人學習與交流使用，嚴禁用於商業以及不良用途。 \n如有發現任何商業行為以及不良用途，軟件作者有權撤銷使用權。 使用本軟件所存在的風險將完全由其本人承擔，軟件作者不承擔任何責任。 \n軟件註明之服務條款外，其它因不當使用本軟件而導致的任何意外、疏忽、合約毀壞、誹謗、版權或其他知識產權侵犯及其所造成的任何損失，本軟件作者概不負責，亦不承擔任何法律責任。 \n對於因不可抗力或因黑客攻擊、通訊線路中斷等不能控制的原因造成的服務中斷或其他缺陷，導致用戶不能正常使用，軟件作者不承擔任何責任，但將盡力減少因此給用戶造成的損失或影響。 \n本聲明未涉及的問題請參見國家有關法律法規，當本聲明與國家有關法律法規衝突時，以國家法律法規為準。 本軟件相關聲明版權及其修改權、更新權和最終解釋權均屬軟件作者所有。\n");


    }
    if (msg.content === "查詢網站") {
      msg.reply("wait for it");
      result = "";
      result = "注意!此網站建議跨vpn至日本執行\n勿多開該網站\n先安裝插鍵\n https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai\n   在進入https://bothtml.yuchinchentw.repl.co/ \n\n使用完畢請把插鍵關閉或者移除\n 忘記移除或關閉者後果自負"

      await msg.reply(result)
    }


    if (msg.content === "美好") {

      msg.reply("wait for it");

      // start of the program
      result = "";
      result = "查無此人";
      await msg.reply(result)


    }

    if (msg.content === "test") {
      //for testing
      msg.reply("wait for it");
      //let server = msg.guild.id;
      //console.log(server)
      client.guilds.cache.get(server).leave()
        .catch(err => {
          console.log(`there was an error leaving the guild: \n ${err.message}`);
        })



      // With async function



    }
    if (msg.content === "test2") {

      const canvasRenderService = new ChartJSNodeCanvas({
        width: 800, height: 600, chartCallback: (ChartJS) => {
          /** Add plugins here **/
          //ChartJS.global.defaultFontFamily = 'VTKS UNAMOUR';
          ChartJS.register(require('chartjs-plugin-datalabels'))
        }
      });
      canvasRenderService.registerFont('./fonts/NotoSansTC-Black.otf', { family: 'Montserrat', weight: '900' })

      let dates = [3.1, 7.2, 5, 6, 4];
      let cases = [1, 2, 6, 4, 7];
      let recovered = [3, 4, 0, 21, 1];

      const configuration = {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "測試",
              data: cases,
              backgroundColor: "rgba(255, 0, 0, 0.3)",
              borderColor: "rgba(255, 0, 0, 0.3)",
              borderWidth: 5,
              fill: true,
              pointRadius: 1
            },

            {
              label: "Recoveries",
              data: recovered,
              backgroundColor: "rgba(128, 173, 219, 0.3)",
              borderColor: "rgba(128, 173, 219, 0.3)",
              borderWidth: 5,
              fill: true,
              pointRadius: 1
            }
          ]
        },
        options: {
          legend: {
            position: "bottom",
            labels: {
              fontColor: "rgb(255, 255, 255,1)",
              fontSize: 5,

            }
          },
          scales: {
            xAxes: {
              grid: {
                display: false
              },
              ticks: {
                fontColor: "rgba(255, 255, 255, 1"
              }
            },
            yAxes: {
              grid: {
                lineWidth: 5,
                color: "rgba(255, 255, 255, 0.8)"
              },
              ticks: {
                fontColor: "rgba(255, 255, 255, 1"
              }
            }
          }

        }
      };
      const image = await canvasRenderService.renderToBuffer(configuration);

      let embed = new Discord.MessageEmbed();
      const attachment = new Discord.MessageAttachment(image, "image.png");
      embed.attachFiles(attachment);
      embed.setImage("attachment://image.png");
      msg.channel.send(embed);
    }

     if (msg.content.includes("hismone(") && msging === true && !msg.content.includes("錯誤") && msg.content.indexOf("h") == 0) {
      msg.reply("wait for it 搜尋中稍等");

      let endindex = msg.content.indexOf(")");
      let sub = msg.content.substring(8, endindex);
      console.log(sub)
      let spli = sub.split(',');
      if (spli.length != 6) {
        msg.reply("錯誤格式 hismone(yy,mm,dd,yy,mm,dd)");
        return;
      }
      if (spli[0].length >= 5) {
        msg.reply("錯誤查詢物件輸入");
        return;
      }
      if (parseInt(spli[0]) < 2021) {
        msg.reply("起始必須大於2021年");
        return;
      }
      if (parseInt(spli[1]) > 12 || parseInt(spli[1]) < 1) {
        msg.reply("起始月份<=12&&>=1");
        return;
      }
      if (parseInt(spli[2]) > 31 || parseInt(spli[2]) < 1) {
        msg.reply("起始日<=31&&>=1");
        return;
      }
      if (parseInt(spli[3]) < 2021) {
        msg.reply("結束必須大於2021年");
        return;
      }
      if (parseInt(spli[4]) > 12 || parseInt(spli[4]) < 1) {
        msg.reply("結束月份<=12&&>=1");
        return;
      }

      if (parseInt(spli[5]) > 31 || parseInt(spli[5]) < 1) {

        msg.reply("結束日<=31&&>=1");
        return;
      }
      if (parseInt(spli[0]) > parseInt(spli[3])) {
        msg.reply("起始年份不可大於結束年分");
        return;
      }
      msg.reply("mute my self");
      await db_money(spli[0], spli[1], spli[2], spli[3], spli[4], spli[5]);
      msging = true;


    }








    if (msg.content.includes("history(") && msging === true && !msg.content.includes("錯誤") && msg.content.indexOf("h") == 0) {
      msg.reply("wait for it 搜尋中稍等");

      let endindex = msg.content.indexOf(")");
      let sub = msg.content.substring(8, endindex);
      console.log(sub)
      let spli = sub.split(',');
      if (spli.length != 7) {
        msg.reply("錯誤格式 history(物件,yy,mm,dd,yy,mm,dd)");
        return;
      }
      if (spli[0].length >= 6) {
        msg.reply("錯誤查詢物件輸入");
        return;
      }
      if (parseInt(spli[1]) < 2021) {
        msg.reply("起始必須大於2021年");
        return;
      }
      if (parseInt(spli[2]) > 12 || parseInt(spli[2]) < 1) {
        msg.reply("起始月份<=12&&>=1");
        return;
      }
      if (parseInt(spli[3]) > 31 || parseInt(spli[3]) < 1) {
        msg.reply("起始日<=31&&>=1");
        return;
      }
      if (parseInt(spli[4]) < 2021) {
        msg.reply("結束必須大於2021年");
        return;
      }
      if (parseInt(spli[5]) > 12 || parseInt(spli[5]) < 1) {
        msg.reply("結束月份<=12&&>=1");
        return;
      }

      if (parseInt(spli[6]) > 31 || parseInt(spli[6]) < 1) {

        msg.reply("結束日<=31&&>=1");
        return;
      }
      if (parseInt(spli[1]) > parseInt(spli[4])) {
        msg.reply("起始年份不可大於結束年分")
        return;
      }
      msg.reply("mute my self");
      await db_search(spli[0], spli[1], spli[2], spli[3], spli[4], spli[5], spli[6]);
      msging = true;


    }
    if (msg.content.includes("hischart(") && msging === true && !msg.content.includes("錯誤") && msg.content.indexOf("h") == 0) {
      msg.reply("wait for it 搜尋中稍等");

      let endindex = msg.content.indexOf(")");
      let sub = msg.content.substring(9, endindex);
      console.log(sub)
      let spli = sub.split(',');
      if (spli.length != 7) {
        msg.reply("錯誤格式 hischart(物件,yy,mm,dd,yy,mm,dd)");
        return;
      }
      if (spli[0].length >= 6) {
        msg.reply("錯誤查詢物件輸入");
        return;
      }
      if (parseInt(spli[1]) < 2021) {
        msg.reply("起始必須大於2021年");
        return;
      }
      if (parseInt(spli[2]) > 12 || parseInt(spli[2]) < 1) {
        msg.reply("起始月份<=12&&>=1");
        return;
      }
      if (parseInt(spli[3]) > 31 || parseInt(spli[3]) < 1) {
        msg.reply("起始日<=31&&>=1");
        return;
      }
      if (parseInt(spli[4]) < 2021) {
        msg.reply("結束必須大於2021年");
        return;
      }
      if (parseInt(spli[5]) > 12 || parseInt(spli[5]) < 1) {
        msg.reply("結束月份<=12&&>=1");
        return;
      }

      if (parseInt(spli[6]) > 31 || parseInt(spli[6]) < 1) {

        msg.reply("結束日<=31&&>=1");
        return;
      }
      if (parseInt(spli[1]) > parseInt(spli[4])) {
        msg.reply("起始年份不可大於結束年分")
      }
      msg.reply("mute my self");
      await chart_search(spli[0], spli[1], spli[2], spli[3], spli[4], spli[5], spli[6]);
      msging = true;


    }

      if (msg.content.includes("hismoney(") && msging === true && !msg.content.includes("錯誤") && msg.content.indexOf("h") == 0) {
      msg.reply("wait for it 搜尋中稍等");

      let endindex = msg.content.indexOf(")");
      let sub = msg.content.substring(9, endindex);
      console.log(sub)
      let spli = sub.split(',');
      if (spli.length != 6) {
        msg.reply("錯誤格式 hismoney(yy,mm,dd,yy,mm,dd)");
        return;
      }
    
      if (parseInt(spli[0]) < 2021) {
        msg.reply("起始必須大於2021年");
        return;
      }
      if (parseInt(spli[1]) > 12 || parseInt(spli[1]) < 1) {
        msg.reply("起始月份<=12&&>=1");
        return;
      }
      if (parseInt(spli[2]) > 31 || parseInt(spli[2]) < 1) {
        msg.reply("起始日<=31&&>=1");
        return;
      }
      if (parseInt(spli[3]) < 2021) {
        msg.reply("結束必須大於2021年");
        return;
      }
      if (parseInt(spli[4]) > 12 || parseInt(spli[4]) < 1) {
        msg.reply("結束月份<=12&&>=1");
        return;
      }

      if (parseInt(spli[5]) > 31 || parseInt(spli[5]) < 1) {

        msg.reply("結束日<=31&&>=1");
        return;
      }
      if (parseInt(spli[0]) > parseInt(spli[3])) {
        msg.reply("起始年份不可大於結束年分")
        return;
      }
      msg.reply("mute my self");
      await chart_money(spli[0], spli[1], spli[2], spli[3], spli[4], spli[5]);
      msging = true;


    }





    if (msg.content.includes("currentchart(") && msging === true && !msg.content.includes("錯誤") && msg.content.indexOf("c") == 0) {
      msg.reply("wait for it 搜尋中稍等");

      let endindex = msg.content.indexOf(")");
      let sub = msg.content.substring(13, endindex);
      console.log(sub)
      let spli = sub.split(',');
      if (spli.length != 7) {
        msg.reply("錯誤格式 currentchart(物件,yy,mm,dd,yy,mm,dd)");
        return;
      }
      if (spli[0].length >= 6) {
        msg.reply("錯誤查詢物件輸入");
        return;
      }
      if (parseInt(spli[1]) < 2021) {
        msg.reply("起始必須大於2021年");
        return;
      }
      if (parseInt(spli[2]) > 12 || parseInt(spli[2]) < 1) {
        msg.reply("起始月份<=12&&>=1");
        return;
      }
      if (parseInt(spli[3]) > 31 || parseInt(spli[3]) < 1) {
        msg.reply("起始日<=31&&>=1");
        return;
      }
      if (parseInt(spli[4]) < 2021) {
        msg.reply("結束必須大於2021年");
        return;
      }
      if (parseInt(spli[5]) > 12 || parseInt(spli[5]) < 1) {
        msg.reply("結束月份<=12&&>=1");
        return;
      }

      if (parseInt(spli[6]) > 31 || parseInt(spli[6]) < 1) {

        msg.reply("結束日<=31&&>=1");
        return;
      }
      if (parseInt(spli[1]) > parseInt(spli[4])) {
        msg.reply("起始年份不可大於結束年分")
      }
      msg.reply("mute my self");
      await current_chart_search(spli[0], spli[1], spli[2], spli[3], spli[4], spli[5], spli[6]);
      msging = true;


    }
    if (msg.content === '!list' && msg.content.indexOf("l") == 1&&msging == true) {
      msg.reply("wait for it 搜尋中稍等");

      var con = await mysql.createConnection({
        host: host,
        user: usr,
        password: mySecret,
        database: db
      });
      await con.connect(function(err) {
        if (err) {
          console.log(err)
          return
        }
        console.log("Connected to database!");
      });
     
      let arr_spl=dblist.split(',');
      for(let k=0;k<arr_spl.length;k++){
        console.log(arr_spl[k])
      
      let quer="SELECT ( SELECT  AVG FROM( SELECT AVG(`avgprize`) AS AVG, DATE( CONVERT_TZ(  `currentTime`,  @@session.time_zone,  '+08:00'  ) ) AS DATE  FROM `prizes` WHERE `objName` = '"+arr_spl[k]+"' AND `currentTime` BETWEEN  SUBDATE(NOW(), 1) AND NOW()  GROUP BY DATE(  CONVERT_TZ( `currentTime`,  @@session.time_zone,  '+08:00'  )  )) total WHERE DATE = DATE(NOW())) /( SELECT  AVG FROM (SELECT  AVG(`avgprize`) AS AVG, DATE(  CONVERT_TZ(  `currentTime`, @@session.time_zone, '+08:00' )) AS DATE FROM `prizes` WHERE `objName` = '"+arr_spl[k]+"' AND `currentTime` BETWEEN   SUBDATE(NOW(), 1) AND NOW()  GROUP BY  DATE(  CONVERT_TZ( `currentTime`, @@session.time_zone, '+08:00' ) )) total  WHERE  DATE = DATE(SUBDATE(NOW(), 1))) AS TEMP";


      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        msg.channel.send("--"+arr_spl[k]);
        //console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)
        for (let i = 0; i < words.length-1; i++) {
          
          let pars=words[i].substring(words[i].indexOf('P')+3,words[i].indexOf('P')+29);
          let re= parseFloat(pars);
          if(re>1){msg.channel.send("平均成交價格:"+(re-1)*100+"% \u21C8")
          }
          if(re==1||Number.isNaN(re)==true){
            msg.channel.send("平均成交價格:0%"+" 沒有變化");
          }
          
          
          if(re<1) {
            msg.channel.send("平均成交價格:"+((1/re)-1)*100+"%  \u21CA");
            
          }

        }
        
      })
        quer="SELECT ( SELECT  AVG FROM( SELECT AVG(`bestprize`) AS AVG, DATE( CONVERT_TZ(  `currentTime`,  @@session.time_zone,  '+08:00'  ) ) AS DATE  FROM `prizes` WHERE `objName` = '"+arr_spl[k]+"' AND `currentTime` BETWEEN  SUBDATE(NOW(), 1) AND NOW()  GROUP BY DATE(  CONVERT_TZ( `currentTime`,  @@session.time_zone,  '+08:00'  )  )) total WHERE DATE = DATE(NOW())) /( SELECT  AVG FROM (SELECT  AVG(`bestprize`) AS AVG, DATE(  CONVERT_TZ(  `currentTime`, @@session.time_zone, '+08:00' )) AS DATE FROM `prizes` WHERE `objName` = '"+arr_spl[k]+"' AND `currentTime` BETWEEN   SUBDATE(NOW(), 1) AND NOW()  GROUP BY  DATE(  CONVERT_TZ( `currentTime`, @@session.time_zone, '+08:00' ) )) total  WHERE  DATE = DATE(SUBDATE(NOW(), 1))) AS TEMP";

        await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        //console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)
        for (let i = 0; i < words.length-1; i++) {
          
          let pars=words[i].substring(words[i].indexOf('P')+3,words[i].indexOf('P')+29);
          let re= parseFloat(pars);
          if(re>1){msg.channel.send("平均最佳成交價格:"+(re-1)*100+"% \u21C8")
          }
         
          if(re==1||Number.isNaN(re)==true){
            msg.channel.send("平均最佳成交價格:0%"+" 沒有變化");
          }
          
         
          if(re<1) {
            msg.channel.send("平均最佳成交價格:"+((1/re)-1)*100+"%  \u21CA");
            
          }

        }
        
      })


      quer="SELECT ( SELECT  AVG FROM( SELECT AVG(`avgprize`) AS AVG, DATE( CONVERT_TZ(  `currentTime`,  @@session.time_zone,  '+08:00'  ) ) AS DATE  FROM `current_prizes` WHERE `objName` = '"+arr_spl[k]+"' AND `currentTime` BETWEEN  SUBDATE(NOW(), 1) AND NOW()  GROUP BY DATE(  CONVERT_TZ( `currentTime`,  @@session.time_zone,  '+08:00'  )  )) total WHERE DATE = DATE(NOW())) /( SELECT  AVG FROM (SELECT  AVG(`avgprize`) AS AVG, DATE(  CONVERT_TZ(  `currentTime`, @@session.time_zone, '+08:00' )) AS DATE FROM `current_prizes` WHERE `objName` = '"+arr_spl[k]+"' AND `currentTime` BETWEEN   SUBDATE(NOW(), 1) AND NOW()  GROUP BY  DATE(  CONVERT_TZ( `currentTime`, @@session.time_zone, '+08:00' ) )) total  WHERE  DATE = DATE(SUBDATE(NOW(), 1))) AS TEMP";

        await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        //console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)
        for (let i = 0; i < words.length-1; i++) {
          
          let pars=words[i].substring(words[i].indexOf('P')+3,words[i].indexOf('P')+29);
          let re= parseFloat(pars);
          if(re>1){msg.channel.send("平均未成交價格:"+(re-1)*100+"% \u21C8")
          }
          if(re==1||Number.isNaN(re)==true){
            msg.channel.send("平均未成交價格:0%"+" 沒有變化");
          }
          
          
          if(re<1) {
            msg.channel.send("平均未成交價格:"+((1/re)-1)*100+"%  \u21CA");
            
          }

        }
        
      })


      quer="SELECT ( SELECT  AVG FROM( SELECT AVG(`bestprize`) AS AVG, DATE( CONVERT_TZ(  `currentTime`,  @@session.time_zone,  '+08:00'  ) ) AS DATE  FROM `current_prizes` WHERE `objName` = '"+arr_spl[k]+"' AND `currentTime` BETWEEN  SUBDATE(NOW(), 1) AND NOW()  GROUP BY DATE(  CONVERT_TZ( `currentTime`,  @@session.time_zone,  '+08:00'  )  )) total WHERE DATE = DATE(NOW())) /( SELECT  AVG FROM (SELECT  AVG(`bestprize`) AS AVG, DATE(  CONVERT_TZ(  `currentTime`, @@session.time_zone, '+08:00' )) AS DATE FROM `current_prizes` WHERE `objName` = '"+arr_spl[k]+"' AND `currentTime` BETWEEN   SUBDATE(NOW(), 1) AND NOW()  GROUP BY  DATE(  CONVERT_TZ( `currentTime`, @@session.time_zone, '+08:00' ) )) total  WHERE  DATE = DATE(SUBDATE(NOW(), 1))) AS TEMP";

        await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        //console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)
        for (let i = 0; i < words.length-1; i++) {
          
          let pars=words[i].substring(words[i].indexOf('P')+3,words[i].indexOf('P')+29);
          let re= parseFloat(pars);
          if(re>1){msg.channel.send("平均最佳未成交價格:"+(re-1)*100+"% \u21C8")
          }
          if(re==1||Number.isNaN(re)==true){
            msg.channel.send("平均最佳未成交價格:0%"+" 沒有變化");
          }
          
          
          if(re<1) {
            msg.channel.send("平均最佳未成交價格:"+((1/re)-1)*100+"%  \u21CA");
            
          }

        }
        
      })


      }//forloop
      await con.end();
      await console.log("connection done");
      msging = true;
      

    }


    if (msg.content === '!logout' && msg.content.indexOf("l") == 1) {
      //process.exit(1);
      msg.channel.send('Resetting...')
        .then(msg => client.destroy())

        .then(function() {
         process.exit(1);
          return client.login(token)
        });


    }

    async function drawchart(obj,dates, best, avg,deal) {
      const canvasRenderService = new ChartJSNodeCanvas({
        width: 800, height: 600, chartCallback: (ChartJS) => {
          /** Add plugins here **/
          //ChartJS.global.defaultFontFamily = 'VTKS UNAMOUR';
          ChartJS.register(require('chartjs-plugin-datalabels'))
        }
      });
      canvasRenderService.registerFont('./fonts/NotoSansTC-Black.otf', { family: 'Montserrat', weight: '900' })

      console.log(dates)
      console.log(best)
      console.log(avg)
      let str_best="";
      let str_avg="";
      if(deal==true){
            str_best="歷史平均最佳成交價格";
            str_avg="歷史平均成交價格";
      }else if(deal == false){
            str_best="歷史平均最佳未成交價格";
            str_avg="歷史平均未成交價格";

      }
      const configuration = {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: obj+str_best,
              data: best,
              //backgroundColor: "rgba(238, 238, 87, 0.3)",
              borderColor: "rgba(238, 238,87, 0.3)",
              borderWidth: 5,
              fill: true,
              pointRadius: 1
            },

            {
              label: obj+str_avg,
              data: avg,
             // backgroundColor: "rgba(128, 173, 219, 0.3)",
              borderColor: "rgba(128, 173, 219, 0.3)",
              borderWidth: 5,
              fill: true,
              pointRadius: 1
            }
          ]
        },
        options: {
          
          scales: {
            xAxes: {
              grid: {
                display: false
              },
              ticks: {
                color: "green",
                 font: {
                                    size: 12,
                                    family:'vazir'
                        }
              }
              
            },
            yAxes: {
              grid: {
                lineWidth: 1,
                color: "rgba(255, 255, 255, 0.8)"
              },
              ticks: {
                color: "green",
                 font: {
                                    size: 16,
                                    family:'vazir'
                        }
              }
            }
          },
          plugins: {
            datalabels: {
                anchor: 'end',
        align: 'left',
                formatter: Math.round,
                color: "red",
                  font: {
          
                    weight: 'bold'
                  }
            },
             legend: {
              labels: {
                  color: "green",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
                  font: {
                    size: 20 // 'size' now within object 'font {}'
                  }
                }
              }
          }

        }
      };
      const image = await canvasRenderService.renderToBuffer(configuration);

      let embed = new Discord.MessageEmbed();
      const attachment = new Discord.MessageAttachment(image, "image.png");
      embed.attachFiles(attachment);
      embed.setImage("attachment://image.png");
      msg.channel.send(embed);
    }

       async function drawmoney(obj,dates, best,deal) {
      const canvasRenderService = new ChartJSNodeCanvas({
        width: 800, height: 600, chartCallback: (ChartJS) => {
          /** Add plugins here **/
          //ChartJS.global.defaultFontFamily = 'VTKS UNAMOUR';
          ChartJS.register(require('chartjs-plugin-datalabels'))
        }
      });
      canvasRenderService.registerFont('./fonts/NotoSansTC-Black.otf', { family: 'Montserrat', weight: '900' })

      console.log(dates)
      console.log(best)
      //console.log(avg)
      let str_best="";
      let str_avg="";
      if(deal==true){
            str_best="歷史平均最佳成交價格";
            str_avg="歷史平均成交價格";
      }else if(deal == false){
            str_best="歷史平均最佳未成交價格";
            str_avg="歷史平均未成交價格";

      }
      const configuration = {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: obj+str_best,
              data: best,
              //backgroundColor: "rgba(238, 238, 87, 0.3)",
              borderColor: "rgba(238, 238,87, 0.3)",
              borderWidth: 5,
              fill: true,
              pointRadius: 1
            }
          ]
        },
        options: {
          
          scales: {
            xAxes: {
              grid: {
                display: false
              },
              ticks: {
                color: "green",
                 font: {
                                    size: 14,
                                    family:'vazir'
                        }
              }
              
            },
            yAxes: {
              grid: {
                lineWidth: 1,
                color: "rgba(255, 255, 255, 0.8)"
              },
              ticks: {
                color: "green",
                 font: {
                                    size: 16,
                                    family:'vazir'
                        }
              }
            }
          },
          plugins: {
            datalabels: {
                anchor: 'end',
        align: 'left',
                formatter: Math.round,
                color: "red",
                  font: {
                    size: 19,
                    weight: 'bold'
                  }
            },
             legend: {
              labels: {
                  color: "green",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
                  font: {
                    size: 20 // 'size' now within object 'font {}'
                  }
                }
              }
          }

        }
      };
      const image = await canvasRenderService.renderToBuffer(configuration);

      let embed = new Discord.MessageEmbed();
      const attachment = new Discord.MessageAttachment(image, "image.png");
      embed.attachFiles(attachment);
      embed.setImage("attachment://image.png");
      msg.channel.send(embed);
    }


    async function db_search(obj, st_year, st_month, st_day, fin_year, fin_month, fin_day) {

      //if (obj.length >= 6) return
      var con = await mysql.createConnection({
        host: host,
        user: usr,
        password: mySecret,
        database: db
      });

      await con.connect(function(err) {
        if (err) {
          console.log(err)
          return
        }
        console.log("Connected to database!");
      });
      let quer = "SELECT CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime`,`objName`,`avgprize`,`bestprize`,`url` FROM `prizes` WHERE `objName`  ='" + obj + "' " + "AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " " + "00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + "  " + " 23:59:59'";
      console.log(quer)
      //SELECT * FROM `prizes` WHERE `objName`='幽暗' AND `currentTime` BETWEEN '2021-10-21 00:00:00' AND '2021-10-22 23:59:59'
      //INSERT INTO `prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ([value-2],[value-3],[value-4],[value-5])
      //"SELECT " + "CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime` " + " FROM prizes"
      let re = "empty";
      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)
        for (let i = 0; i < words.length; i++) {
          msg.channel.send(words[i])
        }
      })
      await con.end();
      await console.log("connection done");
      return re;
    }

    
    async function db_money(st_year, st_month, st_day, fin_year, fin_month, fin_day) {

      //if (obj.length >= 6) return
      var con = await mysql.createConnection({
        host: host,
        user: usr,
        password: mySecret,
        database: db
      });

      await con.connect(function(err) {
        if (err) {
          console.log(err)
          return
        }
        console.log("Connected to database!");
      });
      let quer = "SELECT CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime`,`bestprice` FROM `money` WHERE `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " " + "00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + "  " + " 23:59:59'";
      console.log(quer)
      //SELECT * FROM `prizes` WHERE `objName`='幽暗' AND `currentTime` BETWEEN '2021-10-21 00:00:00' AND '2021-10-22 23:59:59'
      //INSERT INTO `prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ([value-2],[value-3],[value-4],[value-5])
      //"SELECT " + "CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime` " + " FROM prizes"
      let re = "empty";
      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)
        for (let i = 0; i < words.length; i++) {
          msg.channel.send(words[i])
        }
      })
      await con.end();
      await console.log("connection done");
      return re;
    }



    async function chart_search(obj, st_year, st_month, st_day, fin_year, fin_month, fin_day) {

      //if (obj.length >= 6) return
      var con = await mysql.createConnection({
        host: host,
        user: usr,
        password: mySecret,
        database: db
      });

      await con.connect(function(err) {
        if (err) {
          console.log(err)
          return
        }
        console.log("Connected to database!");
      });
      let quer = "";

      if (((st_month !== fin_month)&&(31-parseInt(st_day)+parseInt(fin_day)<32))||(st_year === fin_year && st_month === fin_month)) {
        quer = "SELECT AVG(`avgprize`) as avg, DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      if (((st_month !== fin_month)&&(31-parseInt(st_day)+parseInt(fin_day)>=32))&&(st_year !== fin_year || st_month !== fin_month)) {
        quer = "SELECT AVG(`avgprize`) as avg, MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      console.log(quer)
      //SELECT MONTH(`currentTime`), AVG(`avgprize`) FROM prizes WHERE `objName`='幽暗' GROUP BY MONTH(`currentTime`)
      //SELECT * FROM `prizes` WHERE `objName`='幽暗' AND `currentTime` BETWEEN '2021-10-21 00:00:00' AND '2021-10-22 23:59:59'
      //INSERT INTO `prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ([value-2],[value-3],[value-4],[value-5])
      //"SELECT " + "CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime` " + " FROM prizes"
      //SELECT `objName`,AVG(`avgprize`) as 'avgprice',AVG(`bestprize`) as 'avgprice'FROM `prizes` WHERE `objName`  ='幽暗' AND `currentTime` BETWEEN '2021-10-25 00:00:00' AND '2021-10-25   23:59:59'
      //SELECT AVG(`bestprize`) as avg, DATE(`currentTime`) as date FROM `prizes` WHERE `objName` ='幽暗' GROUP BY DATE(`currentTime`)
      //SELECT AVG(`avgprize`) as avg, DATE(`currentTime`) as date FROM `prizes` WHERE `objName` ='幽暗' AND `currentTime` BETWEEN '2021-10-23 00:00:00' AND '2021-10-24 23:59:59' GROUP BY DATE(`currentTime`)
      let re = "empty";
      let avg_price = [];
      let avg_time = [];
      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)

        for (let i = 0; i < words.length; i++) {
          if (words[i].includes("avg")) {
            avg_price.push(parseInt(words[i].substring(words[i].search("\":") + 2, words[i].search("\"date"))))
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(avg_price)
          }
          if (words[i].includes("date")) {
            avg_time.push(words[i].substring(words[i].search("date") + 7, words[i].search("T")))
            //console.log( words[i].search("T"))
            if( words[i].search("T")<0){
              avg_time.pop();
              avg_time.push(words[i].substring(words[i].search("date") + 6, words[i].search("date")+9))

            }
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(avg_time)
          }
          // msg.channel.send(words[i])
        }
      })
      let best_price = [];
      let best_time = [];

      if (((st_month !== fin_month)&&(31-parseInt(st_day)+parseInt(fin_day)<32))||(st_year === fin_year && st_month === fin_month)){
        quer = "SELECT AVG(`bestprize`) as avg, DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      if (((st_month !== fin_month)&&(31-parseInt(st_day)+parseInt(fin_day)>=32))&&(st_year !== fin_year || st_month !== fin_month)) {
        quer = "SELECT AVG(`bestprize`) as avg, MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      console.log(quer)

      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)

        for (let i = 0; i < words.length; i++) {
          if (words[i].includes("avg")) {
            best_price.push(parseInt(words[i].substring(words[i].search("\":") + 2, words[i].search("\"date"))))
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(best_price)
          }
          if (words[i].includes("date")) {
            best_time.push(words[i].substring(words[i].search("date") + 7, words[i].search("T")))
            if( words[i].search("T")<0){
              best_time.pop();
              best_time.push(words[i].substring(words[i].search("date") + 6, words[i].search("date")+9))
              
            }
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(best_time)
          }
          // msg.channel.send(words[i])
        }
        await drawchart(obj,avg_time, best_price, avg_price,true)
      })

      //await drawchart(avg_time,best_price,avg_price)

      //await drawchart(avg_time,best_price,avg_price);




      await con.end();
      await console.log("connection done");
      return re;
    }
     async function chart_money(st_year, st_month, st_day, fin_year, fin_month, fin_day) {

      //if (obj.length >= 6) return
      var con = await mysql.createConnection({
        host: host,
        user: usr,
        password: mySecret,
        database: db
      });

      await con.connect(function(err) {
        if (err) {
          console.log(err)
          return
        }
        console.log("Connected to database!");
      });
      let quer = "";

      if (((st_month !== fin_month)&&(31-parseInt(st_day)+parseInt(fin_day)<32))||(st_year === fin_year && st_month === fin_month)) {
        quer = "SELECT MAX(`bestprice`) as bestprice, DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `money` WHERE  `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      if (((st_month !== fin_month)&&(31-parseInt(st_day)+parseInt(fin_day)>=32))&&(st_year !== fin_year || st_month !== fin_month)) {
        quer = "SELECT MAX(`bestprice`) as bestprice, MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `money` WHERE `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      console.log(quer)
      //SELECT MONTH(`currentTime`), AVG(`avgprize`) FROM prizes WHERE `objName`='幽暗' GROUP BY MONTH(`currentTime`)
      //SELECT * FROM `prizes` WHERE `objName`='幽暗' AND `currentTime` BETWEEN '2021-10-21 00:00:00' AND '2021-10-22 23:59:59'
      //INSERT INTO `prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ([value-2],[value-3],[value-4],[value-5])
      //"SELECT " + "CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime` " + " FROM prizes"
      //SELECT `objName`,AVG(`avgprize`) as 'avgprice',AVG(`bestprize`) as 'avgprice'FROM `prizes` WHERE `objName`  ='幽暗' AND `currentTime` BETWEEN '2021-10-25 00:00:00' AND '2021-10-25   23:59:59'
      //SELECT AVG(`bestprize`) as avg, DATE(`currentTime`) as date FROM `prizes` WHERE `objName` ='幽暗' GROUP BY DATE(`currentTime`)
      //SELECT AVG(`avgprize`) as avg, DATE(`currentTime`) as date FROM `prizes` WHERE `objName` ='幽暗' AND `currentTime` BETWEEN '2021-10-23 00:00:00' AND '2021-10-24 23:59:59' GROUP BY DATE(`currentTime`)
      let re = "empty";
      let avg_price = [];
      let avg_time = [];
      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)

        for (let i = 0; i < words.length; i++) {
          if (words[i].includes("bestprice")) {
            avg_price.push(parseInt(words[i].substring(words[i].search("\":") + 2, words[i].search("\"date"))))
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(avg_price)
          }
          if (words[i].includes("date")) {
            avg_time.push(words[i].substring(words[i].search("date") + 7, words[i].search("T")))
            //console.log( words[i].search("T"))
            if( words[i].search("T")<0){
              avg_time.pop();
              avg_time.push(words[i].substring(words[i].search("date") + 6, words[i].search("date")+9))

            }
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(avg_time)
          }
          // msg.channel.send(words[i])
        }
        
        await drawmoney("幣值",avg_time, avg_price,true)
      })
      


      //await drawchart(avg_time,best_price,avg_price)

      //await drawchart(avg_time,best_price,avg_price);




      await con.end();
      await console.log("connection done");
      return re;
    }


    async function current_chart_search(obj, st_year, st_month, st_day, fin_year, fin_month, fin_day) {

      //if (obj.length >= 6) return
      var con = await mysql.createConnection({
        host: host,
        user: usr,
        password: mySecret,
        database: db
      });

      await con.connect(function(err) {
        if (err) {
          console.log(err)
          return
        }
        console.log("Connected to database!");
      });
      let quer = "";

      if (((st_month !== fin_month)&&(31-parseInt(st_day)+parseInt(fin_day)<32))||(st_year === fin_year && st_month === fin_month)) {
        quer = "SELECT AVG(`avgprize`) as avg, DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `current_prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      if (((st_month !== fin_month)&&(31-parseInt(st_day)+parseInt(fin_day)>=32))&&(st_year !== fin_year || st_month !== fin_month)) {
        quer = "SELECT AVG(`avgprize`) as avg, MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `current_prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      console.log(quer)
      //SELECT MONTH(`currentTime`), AVG(`avgprize`) FROM prizes WHERE `objName`='幽暗' GROUP BY MONTH(`currentTime`)
      //SELECT * FROM `prizes` WHERE `objName`='幽暗' AND `currentTime` BETWEEN '2021-10-21 00:00:00' AND '2021-10-22 23:59:59'
      //INSERT INTO `prizes`( `objName`, `avgprize`, `bestprize`, `url`) VALUES ([value-2],[value-3],[value-4],[value-5])
      //"SELECT " + "CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00') AS `currentTime` " + " FROM prizes"
      //SELECT `objName`,AVG(`avgprize`) as 'avgprice',AVG(`bestprize`) as 'avgprice'FROM `prizes` WHERE `objName`  ='幽暗' AND `currentTime` BETWEEN '2021-10-25 00:00:00' AND '2021-10-25   23:59:59'
      //SELECT AVG(`bestprize`) as avg, DATE(`currentTime`) as date FROM `prizes` WHERE `objName` ='幽暗' GROUP BY DATE(`currentTime`)
      //SELECT AVG(`avgprize`) as avg, DATE(`currentTime`) as date FROM `prizes` WHERE `objName` ='幽暗' AND `currentTime` BETWEEN '2021-10-23 00:00:00' AND '2021-10-24 23:59:59' GROUP BY DATE(`currentTime`)
      let re = "empty";
      let avg_price = [];
      let avg_time = [];
      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)

        for (let i = 0; i < words.length; i++) {
          if (words[i].includes("avg")) {
            avg_price.push(parseInt(words[i].substring(words[i].search("\":") + 2, words[i].search("\"date"))))
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(avg_price)
          }
          if (words[i].includes("date")) {
            avg_time.push(words[i].substring(words[i].search("date") + 7, words[i].search("T")))
            //console.log( words[i].search("T"))
            if( words[i].search("T")<0){
              avg_time.pop();
              avg_time.push(words[i].substring(words[i].search("date") + 6, words[i].search("date")+9))

            }
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(avg_time)
          }
          // msg.channel.send(words[i])
        }
      })
      let best_price = [];
      let best_time = [];

      if (((st_month !== fin_month)&&(31-parseInt(st_day)+parseInt(fin_day)<32))||(st_year === fin_year && st_month === fin_month)) {
        quer = "SELECT AVG(`bestprize`) as avg, DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `current_prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY DATE(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      if (((st_month !== fin_month)&&(31-parseInt(st_day)+parseInt(fin_day)>=32))&&(st_year !== fin_year || st_month !== fin_month)){
        quer = "SELECT AVG(`bestprize`) as avg, MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00')) as date FROM `current_prizes` WHERE `objName` ='" + obj + "' AND `currentTime` BETWEEN '" + st_year + "-" + st_month + "-" + st_day + " 00:00:00' AND '" + fin_year + "-" + fin_month + "-" + fin_day + " 23:59:59' GROUP BY MONTH(CONVERT_TZ(`currentTime`, @@session.time_zone, '+08:00'))"
      }
      console.log(quer)

      await con.query(quer, async (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        const words = JSON.stringify(result).split("}");
        console.log(words)

        for (let i = 0; i < words.length; i++) {
          if (words[i].includes("avg")) {
            best_price.push(parseInt(words[i].substring(words[i].search("\":") + 2, words[i].search("\"date"))))
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(best_price)
          }
          if (words[i].includes("date")) {
            best_time.push(words[i].substring(words[i].search("date") + 7, words[i].search("T")))
            if( words[i].search("T")<0){
              best_time.pop();
              best_time.push(words[i].substring(words[i].search("date") + 6, words[i].search("date")+9))
              
            }
            //console.log(words[i].search("\":"))
            //console.log(words[i].search("\"date") - words[i].search("\":"))
            // console.log(best_time)
          }
          // msg.channel.send(words[i])
        }
        await drawchart(obj,avg_time, best_price, avg_price,false)
      })

      //await drawchart(avg_time,best_price,avg_price)

      //await drawchart(avg_time,best_price,avg_price);




      await con.end();
      await console.log("connection done");
      return re;
    }





  }
}

)

function compareDecimals(a, b) {
  if (a === b)
    return 0;

  return a < b ? -1 : 1;
}

 
////418076288625016834
//418076288625016832

client.on('guildMemberAdd', member => {
  //member.roles.add(member.guild.roles.cache.find(i => i.name === 'Among The Server'))

  const welcomeEmbed = new Discord.MessageEmbed()

  welcomeEmbed.setColor('#5cf000')
  welcomeEmbed.setTitle('**' + member.user.username + '** is now Among Us other **' + member.guild.memberCount + '** people'+"請不要在這裡打指令去機器人頻道打")
  welcomeEmbed.setImage('https://cdn.mos.cms.futurecdn.net/93GAa4wm3z4HbenzLbxWeQ-650-80.jpg.webp')
  const channel = member.guild.channels.cache.get('901046032048222288');
  if (!channel) return;

  channel.send(welcomeEmbed)
})

client.on('guildMemberRemove', member => {
  const goodbyeEmbed = new Discord.MessageEmbed()

  goodbyeEmbed.setColor('#f00000')
  goodbyeEmbed.setTitle('**' + member.user.username + '** was not the impostor there are **' + member.guild.memberCount + '** left Among Us')
  goodbyeEmbed.setImage('https://gamewith-en.akamaized.net/article/thumbnail/rectangle/22183.png')
  const channel = member.guild.channels.cache.get('901046032048222288');
  if (!channel) return;

  channel.send(goodbyeEmbed)

})

keepAlive()
client.login(token);




