using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Routing;

namespace Trimly.Infrastructure.Helpers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Text;


public class RazorViewToStringRenderer(
    IRazorViewEngine viewEngine,
    ITempDataProvider tempDataProvider,
    IServiceProvider serviceProvider)
{
    public async Task<string> RenderViewToStringAsync<TModel>(
        string viewName,
        TModel model)
    {
        var httpContext = new DefaultHttpContext
        {
            RequestServices = serviceProvider
        };

        var actionContext = new ActionContext(
            httpContext,
            new RouteData(),
            new ActionDescriptor()
        );

        var viewResult = viewEngine.FindView(actionContext, viewName, false);

        if (!viewResult.Success)
            throw new InvalidOperationException($"View '{viewName}' not found.");

        var viewDictionary = new ViewDataDictionary<TModel>(
            new EmptyModelMetadataProvider(),
            new ModelStateDictionary())
        {
            Model = model
        };

        await using var sw = new StringWriter();

        var viewContext = new ViewContext(
            actionContext,
            viewResult.View,
            viewDictionary,
            new TempDataDictionary(
                actionContext.HttpContext,
                tempDataProvider),
            sw,
            new HtmlHelperOptions()
        );

        await viewResult.View.RenderAsync(viewContext);

        return sw.ToString();
    }
}