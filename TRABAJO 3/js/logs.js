let resp;

//? peticion que envía los datos ingresados por el usuario

const peticionError = async error => {
    const data = {
        error,
    };
    resp = await fetch('Requests/ErrorLog.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

const peticionInfo = async (data, msg) => {
    resp = await fetch('Requests/InfoLog.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (resp.ok) {
        alert(msg);
        return true;
    }
    return false;
};

