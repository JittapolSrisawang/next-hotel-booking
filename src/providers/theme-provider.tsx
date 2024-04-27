import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#000',
                        borderRadius: 1,
                    },
                    components: {
                        Button: {
                            controlHeight: 42,
                            defaultBorderColor: '#000',
                        },
                        Input: {
                            controlHeight: 42,
                            activeShadow: 'none',
                            boxShadow: 'none',
                            colorBorder: '#ccc',
                        },
                        Select: {
                            controlHeight: 42,
                            boxShadow: 'none',
                            colorBorder: '#ccc',
                            controlOutline: 'none'
                        }
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </div>
    );
}

export default ThemeProvider;