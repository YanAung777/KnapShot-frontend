import React from 'react';
// hook
// import { useTechnologyHook } from './useTechnologyHook';
// components
import DataList from 'components/data-display/DataList';

export default function RenderComp() {
    // const [data] = useTechnologyHook();
    // return  <DataList data={data}/>;

    return <div style={{
        height: window.innerHeight - 140,
        overflowY: 'scroll'
    }}>
        <DataList />
    </div>
}


