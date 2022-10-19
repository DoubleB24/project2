import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from "react";
import { Bar, getElementAtEvent} from "react-chartjs-2";
import { API_GET } from "../../api";
import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ProductOwnerItem from './ProductOwnerItem';
import ProductOwners from './ProductOwners';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: 'top',
    },
    title: {
        display: true,
        text: 'รายงานจำนวนสินค้า',
    },
};

export default function Report() {
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setCharData] = useState({});
    const [store, setStore] = useState([]);
    const [productStore, setProductStore] = useState([]);
    const chartRef = useRef();

    useEffect(() => {
        async function fetchData() {
            let json = await API_GET("report");
            

            setStore(json.data);

            var labels = [];
            var data = [];


            json.data.map(item => {
                labels.push(item.product_name);
                data.push(item.stock);
            })
              
            var dataset = {
                labels: labels,
                datasets: [
                    {
                        label: "จำนวนสินค้าแต่ละรายการ",
                        data: data,
                        backgroundColor: "#fb7979"
                    }
                ]
            }

            setCharData(dataset);
            setIsLoading(true);
        }

        fetchData();
    },  []);


    const getChart = () => {
        
        if (isLoading) {
            return <Bar 
                options={options} 
                data={chartData}/>;
               
        }
        return <></>

    }

    const onClick = async (event) => {
        var element = getElementAtEvent(chartRef.current, event);
        var index = element[0].index;

        await getProducts(store[index].product_type_id);
    }

    const getProducts = async (product_type_id) =>{
        let json = await API_GET("products" + product_type_id);
        setProductStore(json.data);
    }

    return(

        <>
            <div className="container-fluid mt-3">
                {
                    getChart()
                }
            </div>

            <div className="container-fluid mt-3">

                {
                    productStore.map(item => (
                        <ProductOwnerItem
                            key={item.product_type_id}
                            data={item}/>
                    ))
                }

            </div>
        
        </>

    )

}
