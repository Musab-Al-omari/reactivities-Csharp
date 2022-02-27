using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)

        {
            this._tokenService = tokenService;
            this._signInManager = signInManager;
            this._userManager = userManager;
        }



        [HttpPost("login")]
        public async Task<ActionResult<DTOs.UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                return Unauthorized();
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                    UserName = user.UserName
                };
            }

            return Unauthorized();
        }


        [HttpPost("rigester")]
        public async Task<ActionResult<UserDto>> Rigester(RegisterDto registerDto)
        {




            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("user taken");
            }

            var newUser = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username,
                Bio = "new Bio"
            };

            var result = await _userManager.CreateAsync(newUser, registerDto.Password);


            if (result.Succeeded)
            {
                return CreateUserObject(newUser);

            }

            return BadRequest("Problem rigester user");


        }

        [Authorize]
        [HttpGet("user")]
        public async Task<ActionResult<UserDto>> getUserData()
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
                return CreateUserObject(user);
            }
            catch (Exception)
            {

                return Unauthorized();
            }

        }
        private UserDto CreateUserObject(AppUser newUser)
        {
            return new UserDto
            {
                DisplayName = newUser.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(newUser),
                UserName = newUser.UserName,
            };
        }


    }
}