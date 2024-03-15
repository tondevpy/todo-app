import { useState } from 'react';
import style from './App.module.css';
import { Trash } from '@phosphor-icons/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [nomeTarefa, setNomeTarefa] = useState('');
  const [concluida, setConcluida] = useState(0);

  function criarTarefa() {
    const novaTarefa = {
      id: tarefas.length + 1,
      nome: nomeTarefa,
      finalizada: false,
    };

    setTarefas([...tarefas, novaTarefa]);

    setNomeTarefa('');

    console.log(tarefas);
  }

  function finalizar(id) {
    const tarefaFinalizada = tarefas.find((tarefa) => tarefa.id === id);
    if (tarefaFinalizada) {
      console.log('Tarefa finalizada' + id);
    } else {
      console.log('tarefa não encontrada');
    }
    const novasTarefas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, finalizada: true } : tarefa,
    );

    setTarefas(novasTarefas);
    setConcluida((concluida) => concluida + 1);
    toast.success('Tarefa finalizada....');
  }

  function excluir(id) {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novasTarefas);
    setConcluida((concluida) => concluida - 1);
    toast.error('Tarefa excluida....');
  }
  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.inputs}>
          <div>
            <h1>
              To<span>Do</span>
            </h1>
            <input
              type="text"
              name="tarefa"
              id="tarefa"
              placeholder="Nome da tarefa..."
              value={nomeTarefa}
              onChange={(e) => setNomeTarefa(e.target.value)}
            />
            <button onClick={criarTarefa}>Criar</button>
          </div>
        </div>
      </header>
      <div className={style.tarefas}>
        <div className={style.infos}>
          <div className={style.total}>
            <strong>
              Total de tarefas <span>{tarefas.length}</span>{' '}
            </strong>
          </div>
          <div className={style.concluidas}>
            <strong>
              Concluídas <span>{concluida}</span>
            </strong>
          </div>
        </div>
      </div>

      <div className={style.lista}>
        <div className={style.cards}>
          <ToastContainer theme='dark'/>
          {tarefas.map((element) => (
            <div
              className={element.finalizada ? 'background' : 'noBack'}
              key={element.id}
            >
              <div className={style.card}>
                <div className={style.cardName}>
                  {!element.finalizada && (
                    <input
                      type="radio"
                      name={element.id}
                      id="concluido"
                      onClick={() => finalizar(element.id)}
                    />
                  )}
                  <span className={element.finalizada ? 'riscar' : ''}>
                    {element.nome}
                  </span>
                </div>
                <div
                  className={style.delete}
                  onClick={() => excluir(element.id)}
                >
                  <Trash size={25} color="red" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
