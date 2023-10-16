/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import './App.css';

import { Theme } from '@swc-react/theme';
import { Button } from '@swc-react/button';
import { Banner } from '@swc-react/banner';
import { Divider } from '@swc-react/divider';
import { IllustratedMessage } from '@swc-react/illustrated-message';
import { Link } from '@swc-react/link';
import { Menu } from '@swc-react/menu';
import { MenuItem } from '@swc-react/menu';
import { MenuGroup } from '@swc-react/menu';
import { MenuDivider } from '@swc-react/menu';
import { Card } from '@swc-react/card';
import { IconEdit } from '@swc-react/icons-workflow/Edit.js';

function App() {
    return (
        <Theme theme="spectrum" scale="medium" color="light">
            <div className="App">
                <div
                    id="content"
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    <h1>
                        Integration Plugin - using SWC-React and SWC-UXP
                        Wrappers
                    </h1>
                    <div style={{ margin: '20px' }}>
                        <div style={{ margin: '20px' }}>
                            <Banner>
                                <div slot="header">Header text</div>
                                <div slot="content">Content of the banner</div>
                            </Banner>
                        </div>

                        <div style={{ margin: '20px' }}>
                            <Divider size="l"></Divider>
                        </div>

                        <div style={{ margin: '20px' }}>
                            <div
                                style={{
                                    padding: '15px 20px',
                                    display: 'inline-block',
                                    backgroundColor: '#0f797d',
                                }}
                            >
                                <p style={{ color: 'rgb(240, 240, 240)' }}>
                                    <Link static="white" href="#">
                                        This link is over a background.
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <div style={{ margin: '20px' }}>
                            <IllustratedMessage
                                heading="Drag and Drop Your File"
                                description="Additional descriptive text"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 150 103"
                                    width="150"
                                    height="103"
                                    viewBox="0 0 150 103"
                                >
                                    <path d="M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z"></path>
                                </svg>
                            </IllustratedMessage>
                        </div>

                        <div style={{ margin: '20px' }}>
                            <Menu selects="single">
                                <MenuItem selected>Deselect</MenuItem>
                                <MenuDivider></MenuDivider>
                                <MenuItem>Select inverse</MenuItem>
                                <MenuItem>Feather...</MenuItem>
                                <MenuItem>Select and mask...</MenuItem>
                                <MenuItem>Save selection</MenuItem>
                                <MenuItem disabled>Make work path</MenuItem>
                            </Menu>
                        </div>

                        <div style={{ margin: '20px' }}>
                            <Button
                                variant="primary"
                                onClick={() => alert('Label only')}
                            >
                                Label only
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => alert('Icon + Label')}
                            >
                                <IconEdit slot="icon"></IconEdit>
                                Icon + Label
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => alert('Icon only')}
                            >
                                <IconEdit slot="icon"></IconEdit>
                            </Button>
                        </div>
                        <div style={{ margin: '20px' }}>
                            <Button
                                variant="secondary"
                                onClick={() => alert('Label only')}
                            >
                                Label only
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => alert('Icon + Label')}
                            >
                                <IconEdit slot="icon"></IconEdit>
                                Icon + Label
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => alert('Icon only')}
                            >
                                <IconEdit slot="icon"></IconEdit>
                            </Button>
                        </div>
                        <div style={{ margin: '20px' }}>
                            <Button onClick={() => alert('Label only')}>
                                Label only
                            </Button>
                            <Button onClick={() => alert('Icon + Label')}>
                                <IconEdit slot="icon"></IconEdit>
                                Icon + Label
                            </Button>
                            <Button onClick={() => alert('Icon only')}>
                                <IconEdit slot="icon"></IconEdit>
                            </Button>
                        </div>
                        <div style={{ margin: '20px' }}>
                            <Button
                                variant="negative"
                                onClick={() => alert('Label only')}
                            >
                                Label only
                            </Button>
                            <Button
                                variant="negative"
                                onClick={() => alert('Icon + Label')}
                            >
                                <IconEdit slot="icon"></IconEdit>
                                Icon + Label
                            </Button>
                            <Button
                                variant="negative"
                                onClick={() => alert('Icon only')}
                            >
                                <IconEdit slot="icon"></IconEdit>
                            </Button>
                        </div>
                        <div style={{ margin: '20px' }}>
                            <Card heading="Card Heading" subheading="JPG Photo">
                                <img
                                    slot="cover-photo"
                                    src="https://picsum.photos/200/300"
                                    alt="demo"
                                />
                                <div slot="footer">
                                    {' '}
                                    <Button
                                        variant="secondary"
                                        onClick={() => alert('Icon + Label')}
                                    >
                                        <IconEdit slot="icon"></IconEdit>
                                        Icon + Label
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Theme>
    );
}

export default App;
