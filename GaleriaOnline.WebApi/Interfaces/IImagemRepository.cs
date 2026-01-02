using GaleriaOnline.WebApi.Models;

namespace GaleriaOnline.WebApi.Interfaces
{
    public interface IImagemRepository
    {
        Task<IEnumerable<Imagen>> GetAllAsync();
        Task<Imagen?> GetByIdAsync(int id);
        Task<Imagen> CreateAsync(Imagen imagem);
        Task<bool> UpdateAsync(Imagen imagem);
        Task<bool> DeleteAsync(int id);
    }
}
