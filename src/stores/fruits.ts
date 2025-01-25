import { reactive } from "vue";
import { defineStore } from "pinia";

import axios from "axios";

const HOST = "http://localhost:3000";

interface fruit extends Object {
  isFruit: boolean;
  name: string;
  image: string;
  price: string;
  color: string;
  description: string;
  taste: string;
  expires: string;
  id: number
}

let data_: fruit[] = [];
function searchFruit(el: any, keys: any) {
  for (let key in keys) {
    let keyStr = keys[key];
    if (el["id"] && typeof el["id"] == "number" && el["isFruit"]) {
      const data: fruit = {
        isFruit: el.isFruit,
        name: el.name,
        image: el.image,
        price: el.price,
        color: el.color,
        description: el.description,
        taste: el.taste,
        expires: el.expires,
        id: el.id,
      };

      data_.push(data);
    }
    let elmnt = el[keyStr];
    if (typeof elmnt == "object") {
      searchFruit(elmnt, Object.keys(elmnt));
    }
  }
}

export const useFruitsStore = defineStore("fruits", () => {
  let fruitList: fruit[] = [];
  const fruits = reactive({ fruits: fruitList, count: 0 });
  function addFruit(newFruit: object) {
    axios.post(HOST + "/fruit", newFruit).then((e) => {
      fruits.fruits.push(e.data);
    });
  }
  function deleteFruit(id: number) {
    return new Promise((resolve, reject) => {
      axios
        .delete(HOST + "/fruit/" + id)
        .then(() => {
          let newFruitList:fruit[] = []
          fruits.fruits.forEach((el) => {
            if (el.id != id) {
              newFruitList.push(el);
            }
          });
          console.log(newFruitList)
          fruits.fruits = newFruitList;
          resolve("deleted");
        })
        .catch(() => {
          reject();
        });
    });
  }
  function getFruitById(id: number) {
    return new Promise((resolve, reject) => {
      axios
        .get(HOST + "/fruit/" + id)
        .then((e) => {
          resolve(e.data);
        })
        .catch(() => {
          reject();
        });
    });
  }
  function getFruits() {
    if (fruits.fruits.length == 0) {
      axios.get(HOST + "/fruit").then((e) => {
        searchFruit(e.data, Object.keys(e.data));
        let finalData:any = []
      //Necesito limpiar los datos ya que hay datos repetidos y solo quiero tener uno por id
      //Es un array de objetos y solo quiero obtener un objeto por id
      //SON VARIOS OBJETOS Y TIENEN DISTINTOS ID
        data_.forEach((el) => {
          let found = finalData.find((element:any) => element.id == el.id);
          if (!found) {
            finalData.push(el);
          }
        })
        finalData.sort((a:any, b:any) => a.id - b.id);
        fruits.fruits = finalData;
      });
    }
  }
  return { fruits, addFruit, deleteFruit, getFruits, getFruitById };
});
