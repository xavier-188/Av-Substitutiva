public class Imc()
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string? Nome { get; set; }
    public double Altura { get; set; }
    public double Peso { get; set; }
    public double valorImc { get; set; }
    public string? Classificacao { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}