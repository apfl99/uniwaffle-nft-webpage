import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react'

// 데이터 타입 정의
type TableData = {
  [key: string]: string | number;
};

interface TableProps {
  headers: string[]; // 표 헤더
  data: TableData[]; // 표 데이터
}

// 표 컴포넌트 정의
export const Table: React.FC<TableProps> = ({ headers, data }) => {

    const { connected } = useWallet(); // 지갑 연결 상태 확인

    if (connected) {
        return (
            <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}>
            <thead>
                <tr>
                {headers.map((header, index) => (
                    <th
                    key={index}
                    style={{
                        border: '1px solid #ddd',
                        padding: '8px',
                        backgroundColor: '#f4f4f4',
                        textAlign: 'left',
                    }}
                    >
                    {header}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {headers.map((header, colIndex) => (
                    <td
                        key={colIndex}
                        style={{
                        border: '1px solid #ddd',
                        padding: '8px',
                        }}
                    >
                        {row[header]}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        );
    }
    
};