

using Microsoft.AspNetCore.Identity;

namespace Trimly.Infrastructure;

public class EmailSender: IEmailSender<IdentityUser>
{
    public Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        Console.WriteLine($"Email to {email} | Subject: {subject}");
        return Task.CompletedTask;
    }

    public Task SendConfirmationLinkAsync(IdentityUser user, string email, string confirmationLink)
    {
        Console.WriteLine($"Email to {email} | Subject: ");
        return Task.CompletedTask;
    }

    public Task SendPasswordResetLinkAsync(IdentityUser user, string email, string resetLink)
    {
        Console.WriteLine($"Email to {email} | Subject: ");
        return Task.CompletedTask;
    }

    public Task SendPasswordResetCodeAsync(IdentityUser user, string email, string resetCode)
    {
        Console.WriteLine($"Email to {email} | Subject: ");
        return Task.CompletedTask;
    }
}