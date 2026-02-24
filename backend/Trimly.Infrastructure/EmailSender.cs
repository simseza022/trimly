using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using Trimly.Domain.Emails;
using Trimly.Domain.User;
using Trimly.Infrastructure.Helpers;
using Trimly.Infrastructure.Options;

namespace Trimly.Infrastructure;

public class EmailSender(IOptions<SmtpOptions> options,RazorViewToStringRenderer renderer, IConfiguration config) : IEmailSender<TrimlyUser>
{

    private readonly SmtpOptions _smtpOptions = options.Value;
    private readonly string _clientUrl = config.GetSection("ClientURL").Get<string>() ?? throw new ArgumentNullException("ClientURL");

    private async Task SendEmailAsync(string email, string subject, string htmlMessage)
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
        //1. Decode the URL 
        confirmationLink = WebUtility.HtmlDecode(confirmationLink);
        
        var uri = new Uri(confirmationLink);
        var queryParams = QueryHelpers.ParseQuery(uri.Query);

        string userId;
        string code;
        if (!string.IsNullOrEmpty(queryParams["userId"]) && !string.IsNullOrEmpty(queryParams["code"]))
        {
            userId = queryParams["userId"].ToString();
            code = queryParams["code"].ToString();
        }
        else
        {
            throw new Exception("Error confirming email.");
        }
        
        //2. Create the model
        var model = new SendConfirmationLink
        {
            PlatformLink = $"{_clientUrl}/confirm-email?userId={userId}&code={code}"
        };

        //3. Render the email
        string template = "Emails/SendConfirmationLink";
        var content = await renderer.RenderViewToStringAsync(template, model);
        
        //4. Send the email
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
        
        var content = await renderer.RenderViewToStringAsync(template, model);
        
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
        
        var content = await renderer.RenderViewToStringAsync(template, model);
        
        await this.SendEmailAsync(email, "Confirm your email", content);
        Console.WriteLine($"Email to {email} | Subject: {content}");
    }
}