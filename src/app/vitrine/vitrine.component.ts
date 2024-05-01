import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent {
  public lista: Produto[] = [
    {codigo: 1, nome: "Apple iPhone 11 128GB Branco", marca: "Apple", cor: "Branco", memoriaInterna: 128, memoriaRam: 4, valor: 2549.99, valorPromo: 2400, destaque: 1, estoque: 50, descritivo: "Grave vídeos 4K, faça belos retratos e capture paisagens inteiras com o novo sistema de câmera dupla. Tire fotos incríveis com pouca luz usando o modo Noite. Veja cores fiéis em fotos, vídeos e jogos na tela Liquid Retina de 6.1 polegadas. Leve o desempenho sem precedentes do chip A13 Bionic para seus games, realidade aumentada e fotografia. Faça muito e recarregue pouco com a bateria para o dia todo. E conte com resistência à água de até dois metros por até 30 minutos."},

    {codigo: 2, nome: "Motorola Moto G22 128GB Preto", marca: "Motorola", cor: "Preto", memoriaInterna: 128, memoriaRam: 4, valor: 739.99, valorPromo: 0, destaque: 1, estoque: 0, descritivo: "Conecte-se ao que há de melhor da tecnologia com o Smartphone Motorola Moto g22 128GB Preto 4G Tela 6,5\" IPS 90Hz Câmera Quadrupla 50MP Selfie 16MP Dual Chip Android 12. O Motorola Moto g22 é um dos smartphones Android mais completos do mercado. Surpreenda-se com a qualidade das imagens com sua tela Touchscreen de 6.5 polegadas, que coloca este modelo de Motorola no topo de sua categoria, com   alta resolução de 1600x720 pixel e muito mais! Uma das grandes vantagens do Moto g22 é a sua memória interna de 128 GB com a possibilidade de expansão através de cartão de memória Micro SD de até 1TB. Outro diferencial do Motorola Moto g22 é sua câmera de 50 megapixels que permite ao smartphone capturar imagens incríveis com uma resolução de 8165x6124 pixels e gravar vídeos em alta definição (Full HD) com uma resolução de 1920x1080 pixels. Além disso, sua câmera de selfie de 16 MP permite que seus cliques saiam perfeitos para postar nas redes sociais e possui capacidade de adquirir 12 horas de bateria com apenas 30 minutos de carga através do carregador TurboPower™ 20."},

    {codigo: 3, nome: "Xiaomi Redmi 13C 256GB Azul", marca: "Xiaomi", cor: "Azul", memoriaInterna: 256, memoriaRam: 8, valor: 1650, valorPromo: 1490.99, destaque: 1, estoque: 45, descritivo: "A Xiaomi traz um celular perfeito para você que busca velocidade, design e tecnologia. O smartphone Xiaomi Redmi 13C Azul possui processador Octa-core MediaTek Helio G85, armazenamento interno de 256GB, 8GB de RAM: abra aplicativos, jogos e muito mais com velocidade, eficiência e qualidade. Ideal para usuários que buscam um celular ágil e fluido para o dia a dia. Um conjunto de câmeras poderoso: a câmera tripla traseira conta principal de 50MP e recurso de inteligência artificial para tornar suas fotos ainda mais impressionantes. Suas fotos ainda mais vibrantes. E mais! Impressionante tela de alta definição com 6,74 polegadas e 90Hz. Experiência visual envolvente com taxa de atualização de 90Hz que garante fluidez e suavidade. Ideal para usar apps, jogar e assistir vídeos com qualidade. E para não ficar desconectado, conta com bateria de 5000mAh, é possível ficar horas conectado sem precisar recarregar por longos períodos, durando sem esforço até um dia inteiro de uso prolongado. O Redmi 13C também suporta carregamento rápido de até 18W. Adquira já o seu Xiaomi Redmi 13C Azul e tenha uma experiência incrível."},

    {codigo: 4, nome: "Samsung Galaxy S24 256GB Cinza", marca: "Samsung", cor: "Cinza", memoriaInterna: 256, memoriaRam: 8, valor: 4199.99, valorPromo: 0, destaque: 1, estoque: 62, descritivo: "O Galaxy S24 cinza é o smartphone mais recente da Samsung, e ele vem com uma série de recursos impressionantes. O primeiro é a tela infinita Dynamic AMOLED 2X de 6,2\", que tem uma taxa de atualização de 1-120Hz. Isso significa que a tela pode se adaptar ao conteúdo que você está assistindo, fornecendo uma experiência de visualização mais suave e responsiva. Possui câmera traseira tripla de 50MP + 12MP + 10MP, que é capaz de capturar fotos e vídeos de alta qualidade. A câmera frontal de 12MP é perfeita para selfies e videochamadas. É equipado com 256GB de armazenamento interno e 8GB de memória RAM, onde você tem muito espaço para baixar aplicativos, guardar fotos e vídeos. A bateria de 4000mAh oferece energia para o dia todo e o carregamento rápido de 25W, permite recarregá-lo rapidamente quando necessário. Conta com recursos de inteligência artificial, que ajuda você a realizar tarefas, como encontrar informações, controlar dispositivos domésticos inteligentes e traduzir idiomas. Com tecnologia 5G e Dual Chip, você tem acesso a internet em qualquer lugar, sendo Nano-SIM (4FF) e eSIM (O e-SIM requer um plano de dados que pode ter restrições a mudanças de operadora e roaming, mesmo após o término do contrato. Consulte sua operadora para obter mais detalhes). Com Tradução simultânea, obtenha uma tradução rápida ao idioma na próxima ligação e em mensagens. Circule para pesquisar, seja em fotos ou textos. E o Assistente de Transcrição pode resumir suas gravações de voz. Ele é um smartphone premium que oferece desempenho, recursos e design de última geração. Se você está procurando um telefone que tenha tudo, este é uma ótima opção. Atenção: Produto não acompanha fone de ouvido."},

    {codigo: 5, nome: "Apple iPhone 14 128GB (PRODUCT)RED", marca: "Apple", cor: "Vermelho", memoriaInterna: 128, memoriaRam: 6, valor: 4500, valorPromo: 3899, destaque: 1, estoque: 3, descritivo: "O iPhone 14 tem o sistema de câmera dupla mais impressionante em um iPhone, para fazer fotos espetaculares em pouca e muita luz. E você ganha tranquilidade com nosso novo recurso essencial de segurança. Avisos legais A tela tem bordas arredondadas. Quando medida como um retângulo, a tela tem 6,06 polegadas na diagonal. A área real de visualização é menor. O SOS de Emergência usa uma conexão de rede celular ou chamadas Wi-Fi. A duração da bateria varia de acordo com o uso e a configuração. Consulte apple.com/br/batteries para obter mais informações. É preciso ter um plano de dados. 5G só está disponível em alguns países e por meio de determinadas operadoras. As velocidades variam de acordo com as condições e operadoras locais. Para obter detalhes sobre a compatibilidade com 5G, entre em contato com sua operadora e consulte apple.com/br/iphone/cellular. O iPhone 14 é resistente a respingos, água e poeira e foi testado em condições controladas em laboratório, classificado como IP68 segundo a norma IEC 60529 (profundidade máxima de seis metros por até 30 minutos). A resistência a respingos, água e poeira não é uma condição permanente e pode diminuir com o tempo. Não tente recarregar um iPhone molhado. Veja instruções de limpeza e secagem no Manual do Usuário. Danos decorrentes de contato com líquidos não estão incluídos na garantia."},

    {codigo: 6, nome: "Samsung Galaxy A14 128GB Prata", marca: "Samsung", cor: "Prata", memoriaInterna: 128, memoriaRam: 4, valor: 1109.90, valorPromo: 840.99, destaque: 1, estoque: 43, descritivo: "Com bateria de 5.000 mAh, a Inovação do Smartphone Samsung Galaxy A14 não termina aí. Com tecnologia 5G, o Galaxy A14 que permite a transferência de dados e excelente navegação na internet, além de conectividade Wi-fi e GPS presente no aparelho. Tem também leitor multimídia, videoconferência e bluetooth. Com tela PLS LCD de 6,6 polegadas, ele chega para revolucionar com suas características inovadoras e se tornando uma ótima opção para qualquer tipo de utilização. Com resolução HD+ e taxa de atualização de 90 Hz, possui mais 16 milhões de cores, dando mais clareza à sua tela. Além das 3 câmeras traseiras com 50 Megapixels de resolução, dando uma vivacidade e qualidade a cada clique. O Samsung Galaxy A14 vem equipado com um processador com oito núcleos, Octa-core,  com a velocidade de 2.4GHz, além de possuir uma memória RAM de 4GB e capacidade interna de 128GB e slot para cartões de memória em modelo MicroSD com capacidade de até 1TB. Seu design simples, possui bordas arredondadas e tela infinita, sem botões aparentes ou detalhes que tiram toda a atenção."}
  ];

  public detalhe(produto: Produto){
    localStorage.setItem("detalhe", JSON.stringify(produto));
    window.location.href="./detalhe";
  }

  public comprar(produto: Produto){
    let itemCesta: Item = new Item();
    itemCesta.codigoProduto = produto.codigo;
    itemCesta.nomeProduto = produto.nome;
    itemCesta.qtd = 1;
    if(produto.valor<=produto.valorPromo || produto.valorPromo==0){
      itemCesta.valor = produto.valor;
      itemCesta.total = produto.valor;
    }
    else{
      itemCesta.valor = produto.valorPromo;
      itemCesta.total = produto.valorPromo;
    }

    let lista: Item[] = [];
    let json = localStorage.getItem("cesta");

    if(json == null){
      lista.push(itemCesta);
      console.log(JSON.stringify(lista));
    }
    else{
      lista = JSON.parse(json);
      lista.push(itemCesta)
    }

    localStorage.setItem("cesta", JSON.stringify(lista));
    window.location.href="./cesta";
  }
}