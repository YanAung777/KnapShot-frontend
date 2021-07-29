import React from 'react';

// components
import DataList from 'components/data-display/DigitalEngagementDataList';

export default function RenderComp() {

    return <div style={{
        height: window.innerHeight - 220,
        overflowY: 'scroll'
    }}>
        <DataList />
    </div>
}


