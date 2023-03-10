/* 
利用mockjs提供mock接口
*/
import Mock from "mockjs";
import recommends from "./recommends.json";
import floors from "./floors.json";
import banners from "./banners.json";

// 提供今日接口
Mock.mock('/mock/recommends', { code: 200, data: recommends })

// 提供楼层接口
Mock.mock('/mock/floors', { code: 200, data: floors })

// 提供轮播接口
Mock.mock('/mock/banners', { code: 200, data: banners })

// console.log('mockserver');


