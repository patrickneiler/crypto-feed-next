'use client'
import React from 'react';
import { Tab } from '@headlessui/react';

interface TabInfo {
    name: string;
    component: React.ReactNode;
}

interface TabsProps {
    tabs: TabInfo[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    return (
        <div>
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-indigo-700 text-white shadow'
                                        : 'text-gray-700 dark:text-blue-100 hover:bg-white/[0.12] dark:hover:text-white'
                                )
                            }
                        >
                            {tab.name}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    {tabs.map((tab, index) => (
                        <Tab.Panel key={index}>
                            {tab.component}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default Tabs;