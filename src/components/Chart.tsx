import { useContext, useRef } from "react";
import { DataContext } from "./context";
import '../sass/components/_chart.scss';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { resultObject } from "./types";
import * as helpers from "../helpers";

type ChartProps = {
    arrayResult: resultObject[];
}

function Chart({arrayResult}: ChartProps){
    const language = useContext(DataContext);
    let data = arrayResult.map(x => ({ name: x.nameScale, uv: x.level.replace("%", "") }));
    
    const CustomTooltip = ({active, payload, label }: any) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${label} : ${payload[0].value}%`}</p>
            </div>
          );
        }
        return null;
      };
    //ширина в зависимости от количества шкал, 41 на одну шкалу
    let width = arrayResult.length * 41;// window.innerWidth - 100;// 370;

    const containerChartRef = useRef<HTMLDivElement>(null);
    
    function scroll(element: HTMLDivElement){
        const el = element.querySelector(".chart-container");
        if(helpers.getOffsetRect(el as HTMLDivElement).left < 0)
            containerChartRef.current?.classList.add("scroll-left-box");
        else
            containerChartRef.current?.classList.remove("scroll-left-box");
        if(el && (helpers.getOffsetRect(el as HTMLDivElement).left + width - element.clientWidth - 40 > 0))
            containerChartRef.current?.classList.add("scroll-right-box");
        else
            containerChartRef.current?.classList.remove("scroll-right-box");
    }
   
    return (
        <div style={{position:"relative"}}>
            <div ref={containerChartRef} className="div-chart" onScroll={(event)=>{scroll(event.target as HTMLDivElement)}}>
                <div className="title-scale-charts">{language.levels_scales}</div>
                <div className="chart-container">
                    <AreaChart width={width} height={450} data={data} margin={{ top: 5, right: 20, left: -30, bottom: 10 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#33aa25" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#33aa25" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        {/* <XAxis dataKey="name"/> tick={false}*/}
                        <XAxis dataKey="name" angle={-90} textAnchor="end" height={220}></XAxis>
                        <YAxis domain={[0, 100]}>
                            {/* <Label value="Pages of my website" offset={0} position="insideEnd"/> */}
                        </YAxis>
                        <Tooltip content={<CustomTooltip />}/>
                        <Area type="monotone" dataKey="uv" stroke="#33aa25" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </div>
            </div>
        </div>
    );
}
export default Chart;