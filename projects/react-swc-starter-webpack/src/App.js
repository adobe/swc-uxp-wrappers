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
