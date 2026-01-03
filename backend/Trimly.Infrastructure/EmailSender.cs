namespace Trimly.Application.Common;

public class EmailSender: IEmailSender
{
    public Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        Console.WriteLine($"Email to {email} | Subject: {subject}");
        return Task.CompletedTask;
    }
}