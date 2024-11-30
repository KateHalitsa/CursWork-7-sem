package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeeWorkplace;
import com.example.springcursework.repository.EmployeeWorkplaceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
public class EmployeeWorkplaceServiceImpl implements EmployeeWorkplaceService
{
   @Autowired
   private EmployeeWorkplaceRepository employeeWorkspaceRepository;

    @Override
    public EmployeeWorkplace insert(EmployeeWorkplace employeeVO) {
        return this.employeeWorkspaceRepository.save(employeeVO);
    }

    @Override
    public List<EmployeeWorkplace> findAll() {
        return this.employeeWorkspaceRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.employeeWorkspaceRepository.deleteById(id);
    }

    @Override
    public EmployeeWorkplace findById(int id) {
        return this.employeeWorkspaceRepository.findById(id).get();
    }

    @Override
    public EmployeeWorkplace updateEmployeeWorkplace(int id, EmployeeWorkplace employeeVO) {
        employeeVO.setId(id);
        return this.employeeWorkspaceRepository.save(employeeVO);
    }

    @Override
    public List<EmployeeWorkplace> insertContacts(List<EmployeeWorkplace> contracts){
        return this.employeeWorkspaceRepository.saveAll(contracts);
    }
}
