import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [product, setproduct] = useState("");
  const [saparatedData, setSaparatedData] = useState([]);
  const [price, setPrice] = useState([]);
  const [productData, setProductData] = useState([]);
  const [duplicates, setDuplicates] = useState([]);
  const [wrongInput, setWrongInput] = useState([]);
  const [validated, setValidated] = useState(false);

  const seperatinon = () => {
    const separatedArray = product.split(",");
    setSaparatedData(separatedArray);
    setproduct("");
  };

  useEffect(() => {
    dataSeperation();
  }, [saparatedData]);

  const dataSeperation = () => {
    const productDataArray = [];
    const priceArray = []; // [[],[],[],[]] formate
    const newPrice = [];

    saparatedData.forEach((elem) => {
      const separatedPrice = elem.split(" ");
      const separatedProduct = elem.substring(0, elem.indexOf(" "));

      productDataArray.push(separatedProduct);
      priceArray.push(separatedPrice);
    });

    setProductData(productDataArray);
    priceArray.map((elem, index) => {
      newPrice[index] = elem[1];
      return null;
    });
    setPrice(newPrice);
  };

  const validation = () => {
    console.log(saparatedData, "**seperated Data**");
    console.log(productData, "Product data");
    console.log(wrongInput, "**Wrong Inputs**");
    console.log(duplicates, "**Duplicates**");
    setValidated(true);
    const wrongInputs = [];
    price.map((elem, index) => {
      if (isNaN(Number(elem))) {
        wrongInputs.push(elem);
        return setWrongInput([...wrongInput], elem);
      } else {
        return elem;
      }
    });
    setWrongInput(wrongInputs);
    const duplicateIndices = {};

    productData.forEach((item, index) => {
      if (duplicateIndices[item]) {
        duplicateIndices[item].push(index);
      } else {
        duplicateIndices[item] = [index];
      }
    });

    const duplicateElements = [];
    for (const key in duplicateIndices) {
      if (duplicateIndices[key].length > 1) {
        duplicateElements.push({
          value: key,
          indices: duplicateIndices[key],
        });
      }
    }

    setDuplicates(duplicateElements);
  };

  const combine = () => {
    const combinedData = [];

    const combinedPrices = {};

    duplicates.forEach((duplicate) => {
      const { value, indices } = duplicate;

      let combinedPrice = 0;

      indices.forEach((index) => {
        combinedPrice += parseFloat(price[index]);
      });

      combinedPrices[value] = combinedPrice;

      const combinedString = `${value} ${combinedPrice}`;

      combinedData.push(combinedString);
    });

    saparatedData.forEach((elem, index) => {
      if (!duplicates.some((duplicate) => duplicate.indices.includes(index))) {
        combinedData.push(elem);
      }
    });

    setSaparatedData(combinedData);
    console.log(saparatedData, "new new");
  };
  const keepFirst = () => {
    const newData = [];

    const seenItems = new Set();

    saparatedData.forEach((elem) => {
      const separatedProduct = elem.substring(0, elem.indexOf(" "));

      if (!seenItems.has(separatedProduct)) {
        newData.push(elem);
        seenItems.add(separatedProduct);
      }
    });

    setSaparatedData(newData);
    console.log(saparatedData);
  };

  return (
    <div className="w-screen h-screen py-2">
      <div className="w-full flex justify-center items-center">
        <label htmlFor="dataInput" className="mr-2">
          Enter the data:-
        </label>
        <textarea
          type="text"
          id="dataInput"
          autoFocus
          className="border-gray-500 border-2 focus:outline-none px-1"
          value={product}
          onChange={(e) => setproduct(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 ml-5 rounded-sm text-white p-1"
          onClick={seperatinon}
        >
          Check
        </button>
      </div>
      <div className="px-10  mt-10">
        <div className="bottom-0 left-0 text-gray-400 text-sm font-bold">
          Separeted by ',' 'Or' 'or' '='
        </div>
        <div className="bg-gray-200 w-full h-[300px] rounded-md flex overflow-hidden">
          <div className="h-full w-20 text-right mx-1">
            {saparatedData.map((elem, index) => (
              <div className="text-gray-400 font-semibold">{index + 1}</div>
            ))}
          </div>
          <div className="bg-gray-300 w-[1px] h-full mt-1"></div>
          <div className="h-full w-fit mx-1">
            {saparatedData.map((elem, index) => (
              <>
                <div key={index} className="font-medium">
                  {elem}
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="top-0 left-0 text-gray-400 text-sm font-bold">
          Separeted by ',' 'Or' 'or' '='
        </div>

        <div className="mt-5">
          {duplicates.length > 0 ? (
            <>
              <div className="text-right w-full cursor-pointer text-red-500">
                <span onClick={combine}>combine |</span>
                <span onClick={keepFirst}> keep one</span>
              </div>
              <div className="border-2 border-red-300 rounded-md w-full h-fit px-6 py-2 text-center">
                <ul>
                  {duplicates.map((duplicate, index) => (
                    <li key={index}>
                      {duplicate.value} is repeated at indices{" "}
                      {duplicate.indices.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : wrongInput.length > 0 ? (
            <div className="border-2 border-red-300 rounded-md w-full h-fit px-6 py-2 text-center">
              <p>wrong input:</p>
              <ul>
                {wrongInput.map((price, index) => (
                  <li key={index}>{price} is Incorrect</li>
                ))}
              </ul>
            </div>
          ) : validated ? (
            <div className="border-2 border-green-300 rounded-md w-full h-fit px-6 py-2 text-center">
              <p>SUCESS</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full h-16 text-center bg-blue-800 rounded-[5px] mt-5"
            onClick={validation}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
