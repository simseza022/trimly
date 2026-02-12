using System.Net.Mail;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using Trimly.Domain.Emails;
using Trimly.Domain.User;
using Trimly.Infrastructure.Helpers;
using Trimly.Infrastructure.Options;

namespace Trimly.Infrastructure;

public class EmailSender(IOptions<SmtpOptions> options,RazorViewToStringRenderer _renderer ) : IEmailSender<TrimlyUser>
{

    private readonly SmtpOptions _smtpOptions = options.Value;

    public  async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        using var body = new TextPart(TextFormat.Html);
        body.Text = htmlMessage;

        var toMailAddresses = new MailAddressCollection();
        toMailAddresses.Add(new MailAddress(email));
        
        using var message = new MailMessage
            (new MailAddress("noreply@example.com", null), toMailAddresses[0]);
        message.IsBodyHtml = true;
        message.Subject = subject;
        message.Body = body.ToString();

        using var client = new SmtpClient(_smtpOptions.Host, _smtpOptions.Port);
        await client.SendMailAsync(message);
    }

    public async Task SendConfirmationLinkAsync(TrimlyUser user, string email, string confirmationLink)
    {
        var model = new SendConfirmationLink
        {
            PlatformLink = confirmationLink
        };

        string template = "Emails/SendConfirmationLink";
        
        var content = await _renderer.RenderViewToStringAsync(template, model);
        
        await this.SendEmailAsync(email, "Confirm your email", content);
        Console.WriteLine($"Email to {email} | Subject: {content}");
    }

    public async Task SendPasswordResetLinkAsync(TrimlyUser user, string email, string resetLink)
    {
        var model = new SendConfirmationLink
        {
            PlatformLink = resetLink
        };

        string template = "Emails/SendConfirmationLink";
        
        var content = await _renderer.RenderViewToStringAsync(template, model);
        
        await this.SendEmailAsync(email, "Confirm your email", content);
        Console.WriteLine($"Email to {email} | Subject: {content}");
    }

    public async Task SendPasswordResetCodeAsync(TrimlyUser user, string email, string resetCode)
    {
        
        var model = new SendConfirmationLink
        {
            PlatformLink = resetCode
        };

        string template = "Emails/SendConfirmationLink";
        
        var content = await _renderer.RenderViewToStringAsync(template, model);
        
        await this.SendEmailAsync(email, "Confirm your email", content);
        Console.WriteLine($"Email to {email} | Subject: {content}");
    }
}