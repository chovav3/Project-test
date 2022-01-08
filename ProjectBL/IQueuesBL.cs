using ProjectDEC.Queues;
using System.Collections.Generic;

namespace ProjectBL
{
    public interface IQueuesBL
    {
        IEnumerable<Queue> GETQUEUES(string con);
        IEnumerable<Queue> INSERTQUEUES(string con, Queue Queue);
    }
}