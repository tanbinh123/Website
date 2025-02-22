package com.jking.computersite.service.Impl;

import com.jking.computersite.entity.Committee;
import com.jking.computersite.entity.Leader;
import com.jking.computersite.entity.Union;
import com.jking.computersite.mapper.CommitteeMapper;
import com.jking.computersite.mapper.LeaderMapper;
import com.jking.computersite.mapper.UnionMapper;
import com.jking.computersite.service.LeaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class LeaderServiceImpl implements LeaderService {
   @Autowired
   private LeaderMapper leaderMapper;

   @Autowired
   private CommitteeMapper committeeMapper;

  @Autowired
   private UnionMapper unionMapper;

   @Override
    public  List<Committee> work()
    {
        List<Committee>committees=committeeMapper.Select();
        return  committees;
    }

    @Override
   public List<Union> union()
    {

        List<Union>unions=unionMapper.Select();
        return  unions;
    }

    @Override
   public Map institution()
    {
        Map<String, List<Leader>> map= new LinkedHashMap<>();

        int mapnumber;
         try {
             mapnumber=leaderMapper.number();
         }
         catch (Exception e)
         {
             return  null;
         }

         for (int i=1;i<=mapnumber;i++)
         {
             List<Leader>leaders=leaderMapper.select_by_number(i);
             if(leaders != null)
             {
                 map.put(i+"",leaders);
             }
         }

        return  map;
    }
}
