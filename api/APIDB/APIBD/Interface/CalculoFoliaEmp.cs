using APIBD.Data;

namespace APIBD.Interface
{
    public interface ICalculoFolhaEmp
    {

        
        Task ChamarStoredProcedureParaUsuariosAtivos(int Mouth, int Year);


    }
}
