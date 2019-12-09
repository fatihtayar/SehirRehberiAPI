using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SehirRehberi.API.Data;
using SehirRehberi.API.Dtos;
using SehirRehberi.API.Models;

namespace SehirRehberi.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Cities")]
    public class CitiesController : Controller
    {
        private IAppRepository _repository;
        private IMapper _mapper;

        public CitiesController(IAppRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public ActionResult GetCities()
        {
            var _cities = _repository.GetCities().ToList();
            var citiesToReturn = _mapper.Map<List<CityForListDto>>(_cities);
            return Ok(citiesToReturn);
        }

        [HttpPost]
        [Route("Add")]
        public ActionResult Add([FromBody]City city)
        {
            _repository.Add(city);
            _repository.SaveAll();
            return Ok(city);
        }

        [HttpGet]
        [Route("Details")]
        public ActionResult GetCityById(int cityId)
        {
            var _city = _repository.GetCityById(cityId);
            var cityToReturn = _mapper.Map<CityForDetailsDto>(_city);
            return Ok(cityToReturn);
        }

        [HttpGet]
        [Route("Photos")]
        public ActionResult GetPhotosByCity(int CityId)
        {
            var _photos = _repository.GetPhotosByCity(CityId);
            return Ok(_photos);
        }
    }
}