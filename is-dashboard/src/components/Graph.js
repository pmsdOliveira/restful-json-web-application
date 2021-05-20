import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

import "../styles/main.css";

const Graph = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const listener = props.db
            .ref(props.type)
            .limitToLast(10)
            .on("value", (snapshot) => {
                let list = [];
                Object.keys(snapshot.val()).forEach((key) => {
                    list.push(snapshot.val()[key]);
                });

                setData(list);
            });
        return () => props.db.ref(props.type).off("value", listener);
    }, [data, props.db, props.type]);

    return (
        <div className="graph">
            <ResponsiveContainer>
                <LineChart data={data} syncId="sync">
                    <Line type="monotone" dataKey="data" stroke={props.color} />
                    <CartesianGrid stroke="#bbb" />
                    <XAxis dataKey="timestamp" />
                    <YAxis type="number" domain={[props.lims.min, props.lims.max]} />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
            <span style={{ color: props.color }}>Acceleration {props.type.slice(-1).toUpperCase()}</span>
        </div>
    );
};

export default Graph;
