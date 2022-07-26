import React, { useCallback } from "react"

type Props = {
    title: string
    index: number
    setSelectedTab: (index: number) => void
    selectedTab: number
}

const TabTitle: React.FC<Props> = ({ title, setSelectedTab, index, selectedTab }) => {

    const onClick = useCallback(() => {
        setSelectedTab(index)
    }, [setSelectedTab, index])

    return (
        <li className={`li ${selectedTab === index ? 'active' : ''}`}>
            <button onClick={onClick}>{title}</button>
        </li>
    )
}

export default TabTitle;
