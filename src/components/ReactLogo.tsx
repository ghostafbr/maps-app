import reactLogo from "../logo.svg";

export const ReactLogo = () => {
    return (
        <img src={reactLogo} className="App-logo" alt="logo" style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '130px',
        }}/>
    );
};
