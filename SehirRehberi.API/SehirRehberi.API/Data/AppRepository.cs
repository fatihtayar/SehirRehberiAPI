using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SehirRehberi.API.Models;

namespace SehirRehberi.API.Data
{
    public class AppRepository : IAppRepository
    {
        private DataContext _context;

        public AppRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public List<City> GetCities()
        {
            var _cities = _context.Cities.Include(c=>c.Photos).ToList();
            return _cities;
        }

        public City GetCityById(int cityId)
        {
            return _context.Cities.Include(c=>c.Photos).FirstOrDefault(c => c.Id == cityId);
        }

        public Photo GetPhoto(int id)
        {
            return _context.Photos.Find(id);
        }

        public List<Photo> GetPhotosByCity(int cityId)
        {
            var _photos=_context.Photos.Where(p=>p.Id== cityId).ToList();
            return _photos;
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
