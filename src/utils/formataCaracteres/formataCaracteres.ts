function formatCPF(cpf?: string) {
    // Remove caracteres não numéricos
    if (cpf) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
    // Adiciona a máscara de CPF (###.###.###-##)
}

function formatCNPJ(cnpj?: string) {
    // Remove caracteres não numéricos
    if (cnpj) {
        cnpj = cnpj?.replace(/\D/g, '');
        // Adiciona a máscara de CNPJ (##.###.###/####-##)
        return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
    }
}

function formatTelefone(telefone?: string) {
    // Remove caracteres não numéricos
    if (telefone) {
        telefone = telefone.replace(/\D/g, '')
        // Adiciona a máscara de telefone (## ####-####)
        return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(6)}`;
    }
}

function formatNIT(nit?: string) {
    // Remove caracteres não numéricos
    if (nit) {
        nit = nit.replace(/\D/g, '');
        // Adiciona a máscara de NIT (###.#####.##-#)
        return `${nit.slice(0, 3)}.${nit.slice(3, 8)}.${nit.slice(8, 10)}-${nit.slice(10)}`;
    }
}

function formatDinheiro(dinheiro?: number) {
    if (dinheiro) return `R$ ${dinheiro.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

function formatCarteiraTrabalho(carteira?: string) {
    if (carteira) {
        carteira = carteira.replace(/\D/g, '');
        return `${carteira.slice(0, 5)}-${carteira.slice(5, 11)}/${carteira.slice(11, 13)}`
    }
}

function formatTituloEleitor(titulo?: string) {

    if (titulo) {
        // Remove caracteres não numéricos
        titulo = titulo.replace(/\D/g, '');
        // Adiciona a máscara do Título de Eleitor (### #### #### ####)
        return `${titulo.slice(0, 3)} ${titulo.slice(3, 7)} ${titulo.slice(7, 11)} ${titulo.slice(11)}`;
    }
}

function formatReservista(reservista?: string) {
    if (reservista) {
        // Remove caracteres não numéricos
        reservista = reservista.replace(/\D/g, '');
        // Adiciona a máscara do Certificado de Reservista (######/#####/##)
        return `${reservista.slice(0, 6)}/${reservista.slice(6, 10)}/${reservista.slice(9, 11)}`;
    }
}
function formatRG(rg?: string) {

    if (rg) {
        // Remove caracteres não numéricos
        rg = rg.replace(/\D/g, '');

        // Adiciona a máscara do RG (##.###.###-#)
        return `${rg.slice(0, 2)}.${rg.slice(2, 5)}.${rg.slice(5, 8)}-${rg.slice(8)}`;

    }
}
export function removePontosETraços(valor?: string, type?:string){
    if(valor && type != "date") return valor.replace(/[\/.-]/g, '');
    else return valor || ""
}


export const formataCaracteres = (type: string, value: number | string | undefined) => {
    return value
    if (type === 'dinheiro') return formatDinheiro(Number(value))
    if (type === 'cpf') return formatCPF(value?.toString())
    if (type === 'cnpj') return formatCNPJ(value?.toString())
    if (type === 'nit') return formatNIT(value?.toString())
    if (type === 'carteiradetrabalho') return formatCarteiraTrabalho(value?.toString())
    if (type === 'reservista') return formatReservista(value?.toString())
    if (type === 'tituloeleitor') return formatTituloEleitor(value?.toString())
    if (type === 'telefone') return formatTelefone(value?.toString());
    if(type === 'rg') return formatRG(value?.toString())
    if(type === 'remove') return removePontosETraços(value?.toString())
}