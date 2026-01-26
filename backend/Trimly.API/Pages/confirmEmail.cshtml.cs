using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Trimly.Domain.User;

namespace Trimly.API.Pages;

public class confirmEmail(UserManager<TrimlyUser> userManager) : PageModel
{
    public string Title { get; set; } = "Basic Page";

    public async Task<IActionResult> OnGet(string userId, string code)
    {
        var user = await userManager.FindByIdAsync(userId);
        if (user == null) return NotFound();

        var result = await userManager.ConfirmEmailAsync(user, code);

        return Page();
    }
}