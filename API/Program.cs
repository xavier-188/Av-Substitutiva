using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddCors(options =>
  options.AddPolicy("Acesso Total",
    configs => configs
      .AllowAnyOrigin()
      .AllowAnyHeader()
      .AllowAnyMethod())
);

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapPost("/api/imc/cadastrar", ([FromServices] AppDbContext ctx, [FromBody] Imc imc) =>
{

    imc.valorImc = imc.Peso / (imc.Altura * imc.Altura);

    if (imc.valorImc < 18.5)
    {
        imc.Classificacao = "Magreza";
    }
    else if (imc.valorImc < 24.9)
    {
        imc.Classificacao = "Normal";
    }
    else if (imc.valorImc < 29.9)
    {
        imc.Classificacao = "Sobrepeso";
    }
    else if (imc.valorImc < 34.9)
    {
        imc.Classificacao = "Obesidade 1";
    }
    else if (imc.valorImc < 39.9)
    {
        imc.Classificacao = "Obesidade 2";
    }
    else
    {
        imc.Classificacao = "Obesidade 3(Grave)";
    }

    ctx.Imcs.Add(imc);
    ctx.SaveChanges();
    return Results.Created("", imc);

});

app.MapGet("/api/imc/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Imcs.Any())
    {
        return Results.Ok(ctx.Imcs.ToList());
    }
    return Results.BadRequest("Lista vazia!");

});

app.MapGet("/api/imc/listar/{classificacao}", ([FromServices] AppDbContext ctx, [FromRoute] string classificacao) =>
{

    return Results.Ok(ctx.Imcs.Where(x => x.Classificacao == classificacao));

});

app.MapPut("/api/imc/alterar/{id}", ([FromServices] AppDbContext ctx, [FromRoute] string id, [FromBody] Imc imcAlterado) =>
{
    Imc imcBuscado = ctx.Imcs.Find(id);

    if (imcBuscado == null)
    {
        return Results.NotFound("Registro não encontrado");
    }

    imcBuscado.Nome = imcAlterado.Nome;
    imcBuscado.Altura = imcAlterado.Altura;
    imcBuscado.Peso = imcAlterado.Peso;

    imcBuscado.valorImc = imcBuscado.Peso / (imcBuscado.Altura * imcBuscado.Altura);


    ctx.Imcs.Update(imcBuscado);
    ctx.SaveChanges();
    return Results.Ok("IMC Recalculado!");
});

app.UseCors("Acesso Total");

app.Run();
