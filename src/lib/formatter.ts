export const cnpjFormatter = (v: string | undefined) => {
    if (!v) return '';
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
    return v;
};

export const cpfFormatter = (v: string | undefined) => {
    if (!v) return '';
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return v;
};

export const cellphoneFormatter = (v: string | undefined) => {
    if (!v) return '';
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    v = v.replace(/(-\d{4})\d+?$/, "$1");
    return v;
};

export const cepFormatter = (v: string | undefined) => {
    if (!v) return '';
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    v = v.replace(/(-\d{3})\d+?$/, "$1");
    return v;
};

export const realFormatter = (v: number | string | undefined) => {
    if (v === undefined || v === null) return '';

    const number = typeof v === 'string' ? Number(v) : v;

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
};


export const numberOnlyFormatter = (v: string | undefined) => {
    if (!v) return '';
    v = String(v).replace(/\D/g, "");
    return v;
};

export const ncmFormatter = (v: string | undefined) => {
    if (!v) return '';
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{4})(\d{2})(\d{2})/, "$1.$2.$3");
    return v;
};