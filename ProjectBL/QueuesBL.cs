using Dapper;
using ProjectDEC.Queues;
using ProjectDL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace ProjectBL
{
    public class QueuesBL : IQueuesBL
    {
        private readonly IGeneralDL _GeneralDL;
        public QueuesBL(IGeneralDL GeneralDL)
        {
            _GeneralDL = GeneralDL;
        }

        public IEnumerable<Queue> GETQUEUES(string con)
        {
            var parameterList = new DynamicParameters();
            var SP = QueueOperation.GET_QUEUES;
            return (IEnumerable<Queue>)_GeneralDL.Execute<Queue>(con, SP, parameterList, CommandType.StoredProcedure);
        }

        public IEnumerable<Queue> INSERTQUEUES(string con, Queue Queue)
        {
            var parameterList = new DynamicParameters();
            parameterList.Add("name", Queue.name);
            parameterList.Add("dogName", Queue.dogName);
            parameterList.Add("date", Queue.date);

            var SP = QueueOperation.INSERT_QUEUES;
            return (IEnumerable<Queue>)_GeneralDL.Execute<Queue>(con, SP, parameterList, CommandType.StoredProcedure);
        }

    }
}
