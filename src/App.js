import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [product, setproduct] = useState("");
  const [saparatedData, setSaparatedData] = useState([]);
  const [price, setPrice] = useState([]);
  const [productData, setProductData] = useState([]);
  const [duplicates, setDuplicates] = useState([]);
  const [wrongInput, setWrongInput] = useState([]);
  const [validated,setValidated] = useState(false)

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
    console.log(saparatedData,"saparatedData");
    console.log(duplicates,"duplicates");
  }
  const keepFirst = () => {
    let combinePrice = 0;
    duplicates.map((elem,index)=>{
      combinePrice = combinePrice + price[elem.indices[index],[0]];
    })
  }

  return (
    <>
      <div className="flex-col justify-center items-center w-screen">
        <div>
          <label htmlFor="dataInput" className="mr-2">
            Enter the data:-
          </label>
          <input
            type="text"
            id="dataInput"
            autoFocus
            className="border-gray-500 border-b-2 focus:outline-none"
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
        <div className="bg-gray-500 w-[500px] h-[200px] my-10">
          {saparatedData.map((elem, index) => (
            <div key={index} className="h-5 flex items-center justify-center">
              <div>{index + 1}</div>
              <div className="border-[1px] border-red-500 h-full rounded-sm"></div>
              <div>{elem}</div>
            </div>
          ))}
        </div>

        <div>
          {duplicates.length > 0 ? (
            <>
              <div className="text-right w-[500px] cursor-pointer text-red-500">
                <span onClick={combine}>combine |</span>
                <span onClick={keepFirst}> keep one</span>
              </div>
              <div className="border-2 border-red-300 rounded-md w-[500px] px-6 py-2 text-center">
                <p>Duplicate Elements:</p>
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
            <div className="border-2 border-red-300 rounded-md w-[500px] px-6 py-2 text-center">
              <p>wrong input:</p>
              <ul>
                {wrongInput.map((price, index) => (
                  <li key={index}>{price} is Incorrect</li>
                ))}
              </ul>
            </div>
          ) : validated ? (
            <div className="border-2 border-green-300 rounded-md w-[500px] px-6 py-2 text-center">
              <p>SUCESS</p>
            </div>
          ): ""}
        </div>
        <div>
          <button
            type="submit"
            className="w-[500px] text-center bg-blue-800 rounded-[5px] mt-5"
            onClick={validation}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
export default App;
